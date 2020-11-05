using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class ProdutoBLL
    {
        public List<Produto> GetAll(Context context)
        {
            return context.Produto.Include(x => x.Embalagem).ToList();
        }

        public Produto Get(Context context, int id)
        {
            return context.Produto.FirstOrDefault(x => x.Id == id);
        }

        public bool Post(Context context, Produto produto)
        {
            if (Exists(context, produto.Id))
                return false;

            if (produto.Embalagem != null)
                produto.Embalagem = context.Embalagem.Find(produto.Embalagem.Id);

            context.Produto.Add(produto);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Produto produto)
        {
            if (produto.Embalagem != null)
                produto.Embalagem = context.Embalagem.Find(produto.Embalagem.Id);
            else produto.Embalagem = null;

            context.Entry(produto).State = EntityState.Modified;

            context.SaveChanges();
            return true;
        }

        public bool ExistsIdBanco(Context context, int idBanco)
        {
            return context.Produto.Any(x => x.IdBanco.Equals(idBanco));
        }

        public bool Exists(Context context, int id)
        {
            return context.Produto.Any(x => x.Id.Equals(id));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Produto produto = Get(context, id);
                context.Produto.Remove(produto);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
