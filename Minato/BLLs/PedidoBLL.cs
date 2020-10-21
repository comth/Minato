using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class PedidoBLL
    {
        public List<Pedido> GetAll(Context context)
        {
            return context.Pedido.ToList();
        }

        public Pedido Get(Context context, int id)
        {
            return context.Pedido.Find(id);
        }

        public bool Post(Context context, Pedido pedido)
        {
            context.Pedido.Add(pedido);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Pedido pedido)
        {
            if (Exists(context, pedido.Id))
            {
                context.Entry(pedido).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idPedido)
        {
            return context.Pedido.Any(x => x.Id.Equals(idPedido));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Pedido pedido = new Pedido() { Id = id };
                context.Pedido.Attach(pedido);
                context.Pedido.Remove(pedido);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
