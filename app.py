# ================= Imports ================= #
from flask import Flask, render_template, request, jsonify, g, redirect
import sqlite3 as sql

# ================= State ================= #
DB_RECIPE_PATH = "recipes.db"

app = Flask(__name__)

@app.before_request
def db_connect():
    g.db = sql.connect(DB_RECIPE_PATH)

@app.teardown_request
def db_disconnect(exception):
    if g.db: g.db.close() 

# ================= Routes ================= #

@app.route("/")
def index():
    # Retrieve recipes, filtering based
    # on desired effort levels, and any
    # key items.
    query = "SELECT * from recipes"
    efforts = request.form.getlist("effort")
    keyitems_string = request.form.get("keyitems")

    if efforts:
        foo = [f"'{x}'" for x in request.form.getlist("effort")]
        filter = ",".join(foo)
        query += f" WHERE effort IN ({filter})"
    
    if keyitems_string:
        # TODO: maybe search title for keywords too?
        keywords = keyitems_string.split(',')
        array = [f"items LIKE '%{kw}%'" for kw in keywords]
        filter = " OR ".join(array)
        query += f" AND ({filter})" if efforts else f" WHERE {filter}"

    query += ';'

    cursor = g.db.execute(query)
    cursor.row_factory = sql.Row # return rows as dicts not tuples.
    results = cursor.fetchall()
    
    recipes_data = []
    for row in results:
        recipe = {
            "title": row["title"],
            "notes": row["notes"],
            "items": row["items"],
            "effort": row["effort"],
            "ruid": row["ruid"]
        }
        recipes_data.append(recipe)
    
    return render_template("index.html", recipes=recipes_data, recipe_count=len(recipes_data)), 200

@app.route("/recipe", methods=["POST", "DELETE", "PATCH"])
def recipe():
    match request.method:
        case "POST":
            # Get posted recipe info.
            title = request.form.get("title")
            notes = request.form.get("notes")
            items = request.form.get("items")
            effort_rating = request.form.get("effort")

            # Put recipe into DB.
            query = "INSERT INTO recipes    \
                (title,notes,items,effort)  \
                VALUES (?,?,?,?);"
            notes_entry = notes if notes else None
            g.db.execute(query, (title,notes_entry,items,effort_rating))
            g.db.commit()
                
            return f"{title}, \"{notes}\", {items}, {effort_rating}"

        case "DELETE":
            ruid = request.json.get('ruid')
            if ruid:
                try:
                    g.db.execute("DELETE FROM recipes WHERE ruid=?;", (ruid,))
                    g.db.commit()
                    return '', 204
                except Exception as e:
                    return 'Failed to delete recipe', 500
            else:
                return 'No RUID specified', 400
            
        case "PATCH":
            # TODO: supplying nothing for required fields, doesn't
            # result in server error.

            # Get posted recipe info.
            title = request.json.get("title")
            notes = request.json.get("notes")
            items = request.json.get("items")
            effort_rating = request.json.get("effort")
            ruid = request.json.get("ruid")

            if ruid:
                try:
                    query = "UPDATE recipes SET title=?,notes=?,items=?,effort=? WHERE ruid=?;"
                    g.db.execute(query, (title,notes,items,effort_rating,ruid))
                    g.db.commit();
                    return '', 200
                except Exception as e:
                    return 'Failed to delete recipe', 500
            else:
                return 'No RUID specified', 400 