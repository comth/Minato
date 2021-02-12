using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class MesaBLL
    {
        public List<Mesa> GetAll(Context context)
        {
            return context.Mesa.Include(x => x.Status).ToList();
        }

        public Mesa Get(Context context, int id)
        {
            return context.Mesa.Find(id);
        }

        public bool Post(Context context, Mesa mesa)
        {
            if (context.Mesa.Any(x => x.Numero == mesa.Numero))
                return false;

            mesa.Status = context.Status.Find(mesa.Status.Id);
            context.Mesa.Add(mesa);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Mesa mesa)
        {
            if (Exists(context, mesa.Id))
            {
                Mesa mesaBanco = context.Mesa.Find(mesa.Id);
                mesaBanco.Status = context.Status.Find(mesa.Status.Id);
                mesaBanco = mesa;
                
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool ExistsNumero(Context context, int numero)
        {
            return context.Mesa.Any(x => x.Numero == numero);
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
