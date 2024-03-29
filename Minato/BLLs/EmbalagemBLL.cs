﻿using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class EmbalagemBLL
    {
        public List<Embalagem> GetAll(Context context)
        {
            return context.Embalagem.ToList();
        }

        public Embalagem Get(Context context, int id)
        {
            return context.Embalagem.Find(id);
        }

        public bool Post(Context context, Embalagem embalagem)
        {
            context.Embalagem.Add(embalagem);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Embalagem embalagem)
        {
            if (Exists(context, embalagem.Id))
            {
                context.Entry(embalagem).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idEmbalagem)
        {
            return context.Embalagem.Any(x => x.Id.Equals(idEmbalagem));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Embalagem embalagem = new Embalagem() { Id = id };
                context.Embalagem.Attach(embalagem);
                context.Embalagem.Remove(embalagem);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
