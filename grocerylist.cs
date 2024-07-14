// ============== Entry-Point ================ /
using System.Collections;
using System.Runtime.InteropServices;

Item[] recipe1 =
{
    new Item("butter", new Grammes(500)),
    new Item("cream", new Millilitres(1250)),
    new Item("cream", new Multiples(1)),
    new Item("beans", new Grammes(400)),
    new Item("potatoes", new Grammes(750))
};

Item[] recipe2 =
{
    new Item("chorizo", new Multiples(1)),
    new Item("cheese", new Multiples(980)),
    new Item("parsely", new Multiples(1)),
    new Item("steak", new Multiples(1)),
    new Item("beef mince", new Grammes(500))
};

Item[] recipe3 =
{
    new Item("baguette", new Multiples(2)),
    new Item("leeks", new Multiples(1)),
    new Item("cheese", new Grammes(50)),
    new Item("chicken breast", new Multiples(5)),
    new Item("whole chicken", new Multiples(1))
};

Item[][] foo = { recipe1, recipe2, recipe3};
GroceryList myList = new GroceryList(foo);
myList.view();

// =========================================== /

class Unit
{
    public float Val;
    protected string _prefix = "";

    public Unit(float val)
    {
        Val = val;
    }

    public override string ToString()
    {
        return string.Format("{0}{1}", Val, _prefix);
    }

    public virtual void Simplify() { }
}

class Grammes: Unit
{
    public Grammes(float val) : base(val) 
    {
        _prefix = "g";
    }

    public override void Simplify()
    {
        if(Val >= 1000.0f)
        {
            Val /= 1000.0f;
            _prefix = "kg";
        }
    }
}

class Millilitres : Unit
{
    public Millilitres(float val) : base(val) 
    {
        _prefix = "ml";
    }

    public override void Simplify()
    {
        if (Val >= 1000.0f)
        {
            Val /= 1000.0f;
            _prefix = "L";
        }
    }
}

class Multiples : Unit
{
    public Multiples(float val) : base(val) 
    {
        _prefix = "x";
    }

    public override string ToString()
    {
        return string.Format("{0}{1}", _prefix, Val);
    }
}

class Item
{
    private string m_Name;
    public Unit m_Amount;

    public Item(string name, Unit amount)
    {
        m_Name = name.ToLower();
        m_Amount = amount;
    }

    public string Name
    {
        get { return m_Name; }
    }

    public string AmtStr
    {
        get { return m_Amount.ToString(); }
    }

    public float Amt
    {
        get { return m_Amount.Val; }
        set { m_Amount.Val = value; }
    }
}

class GroceryList
{
    private Item[][] m_Recipes;
    private List<Item> m_Items;
    public GroceryList(Item[][] recipes)
    {
        m_Items = new List<Item>();
        m_Recipes = recipes;

        // generate list ...
        collapseRecipes();
        mergeDuplicates();
        simplifyUnits();
    }

    private void simplifyUnits()
    {
        foreach(Item item in m_Items)
        {
            item.m_Amount.Simplify();
        }
    }

    private void mergeDuplicates()
    {
        Hashtable refs = new Hashtable();
        List<int> toRemove = new List<int>();

        for (int k = m_Items.Count() - 1; k >= 0; k--)
        {
            Item item = m_Items[k];

            if (refs.ContainsKey(item.Name))
            {
                int refIdx = (int)refs[item.Name];
                Item refItem = m_Items[refIdx];
                
                // note: ensures we don't add different types of units.
                if(item.m_Amount.GetType() == refItem.m_Amount.GetType())
                {
                    refItem.Amt += item.Amt;
                    toRemove.Add(k);
                }
            }
            else
            {
                refs.Add(item.Name, k);
            }
        }

        foreach(int k in toRemove)
        {
           m_Items.RemoveAt(k);
        }
    }

    private void collapseRecipes()
    {
        foreach (Item[] recipe in m_Recipes)
        {
            foreach (Item item in recipe)
            {
                m_Items.Add(item);
            }
        }
    }

    public void view()
    {
        foreach (Item item in m_Items)
        {
            string itemStr = string.Format("{0}, {1}", item.Name, item.AmtStr);
            Console.WriteLine(itemStr);
        }
     
        Console.ReadKey();
    }
}