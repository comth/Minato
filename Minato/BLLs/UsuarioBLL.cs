using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class UsuarioBLL
    {
        public List<Usuario> GetAll(Context context, int itensPagina, int index)
        {
            int skip = itensPagina * (index - 1);
            return context.Usuario.Skip(skip).Take(itensPagina).ToList();
        }

        public Usuario Get(Context context, int id)
        {
            return context.Usuario.Find(id);
        }

        public bool Post(Context context, Usuario usuario)
        {
            context.Usuario.Add(usuario);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Usuario usuario)
        {
            if (Exists(context, usuario.IdUsuario))
            {
                context.Entry(usuario).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idUsuario)
        {
            return context.Usuario.Any(x => x.IdUsuario.Equals(idUsuario));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Usuario usuario = new Usuario() { IdUsuario = id };
                context.Usuario.Attach(usuario);
                context.Usuario.Remove(usuario);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<Usuario> Filtrar(Context context, int itensPagina, int index, string pesquisa)
        {
            int skip = itensPagina * (index - 1);

            //pesquisa por telefone e nome
            return context.Usuario.Where(x => x.Nome.Contains(pesquisa) || x.Telefones.Any(x => x.Value.Contains(pesquisa)))
                                  .Skip(skip).Take(itensPagina).ToList();
        }
    }
}
