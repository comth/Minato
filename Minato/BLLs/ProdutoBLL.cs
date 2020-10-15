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
            return context.Produto.Find(id);
        }

        public bool Post(Context context, Produto produto)
        {
            if (Exists(context, produto.IdProduto)) 
                return false;

            if(produto.Embalagem != null)
                produto.Embalagem = context.Embalagem.Find(produto.Embalagem.IdEmbalagem);

            context.Produto.Add(produto);

            context.Database.OpenConnection();
            try
            {
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Produto ON");
                context.SaveChanges();
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Produto OFF");
            }
            finally
            {
                context.Database.CloseConnection();
            }
            return true;
        }

        public bool Put(Context context, Produto produto)
        {
            if (Exists(context, produto.IdProduto))
            {
                context.Entry(produto).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idProduto)
        {
            return context.Produto.Any(x => x.IdProduto.Equals(idProduto));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Produto produto = new Produto() { IdProduto = id };
                context.Produto.Attach(produto);
                context.Produto.Remove(produto);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
