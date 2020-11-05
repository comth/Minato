using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class UsuarioBLL
    {
        public List<Usuario> GetAll(Context context)
        {
            return context.Usuario.Include(x => x.Telefones).Include(x => x.Enderecos).ToList();
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
            if (Exists(context, usuario.Id))
            {

                context.Entry(usuario).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int idUsuario)
        {
            return context.Usuario.Any(x => x.Id.Equals(idUsuario));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Usuario usuario = new Usuario() { Id = id };
                context.Usuario.Attach(usuario);
                context.Usuario.Remove(usuario);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
