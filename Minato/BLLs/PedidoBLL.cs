using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class PedidoBLL
    {
        public List<Pedido> GetAll(Context context, int itensPagina, int index)
        {
            int skip = itensPagina * (index - 1);
            return context.Pedido.Skip(skip).Take(itensPagina).ToList();
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
            if (Exists(context, pedido.IdPedido))
            {
                context.Entry(pedido).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idPedido)
        {
            return context.Pedido.Any(x => x.IdPedido.Equals(idPedido));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Pedido pedido = new Pedido() { IdPedido = id };
                context.Pedido.Attach(pedido);
                context.Pedido.Remove(pedido);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<Pedido> Filtrar(Context context, int itensPagina, int index, string pesquisa)
        {
            int skip = itensPagina * (index - 1);

            return context.Pedido.Where(x => x.Usuario.Nome.Contains(pesquisa))
                                  .Skip(skip).Take(itensPagina).ToList();
        }
    }
}
