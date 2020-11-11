﻿using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.BLLs
{
    public class MesaBLL
    {
        public List<Mesa> GetAll(Context context)
        {
            return context.Mesa.ToList();
        }

        public Mesa Get(Context context, int id)
        {
            return context.Mesa.Find(id);
        }

        public bool Post(Context context, Mesa mesa)
        {
            context.Mesa.Add(mesa);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Mesa mesa)
        {
            if (Exists(context, mesa.Id))
            {
                context.Entry(mesa).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int id)
        {
            return context.Mesa.Any(x => x.Id.Equals(id));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Mesa mesa = new Mesa() { Id = id };
                context.Mesa.Attach(mesa);
                context.Mesa.Remove(mesa);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
