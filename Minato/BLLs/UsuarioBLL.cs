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
            return context.Usuario.Include(x => x.Telefones).Include(x => x.Enderecos).AsNoTracking().ToList();
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
                var usuarioBanco = context.Usuario.Include(x => x.Telefones).Include(x => x.Enderecos)
                                        .FirstOrDefault(x => x.Id == usuario.Id);

                context.Entry(usuarioBanco).State = EntityState.Detached;

                foreach (var enderecoBanco in usuarioBanco.Enderecos)
                {
                    foreach (var enderecoFront in usuario.Enderecos)
                    {
                        if(enderecoFront.Id == enderecoBanco.Id)  //caso de atualizar exitente
                        {
                            context.Entry(enderecoBanco).State = EntityState.Detached;
                            context.Entry(enderecoFront).State = EntityState.Modified;
                        }
                        else if (enderecoFront.Id != 0) // caso de apagar um existente
                        {
                            context.Endereco.Attach(enderecoFront);
                            context.Endereco.Remove(enderecoFront);
                        }
                        else //caso de adicionar um novo
                        {
                            context.Endereco.Add(enderecoFront);
                        }
                    }
                }

                foreach (var telefoneBanco in usuarioBanco.Telefones)
                {
                    foreach (var telefoneFront in usuario.Telefones)
                    {
                        if (telefoneFront.Id == telefoneBanco.Id)  //caso de atualizar exitente
                        {
                            context.Entry(telefoneBanco).State = EntityState.Detached;
                            context.Entry(telefoneFront).State = EntityState.Modified;
                        }
                        else if (telefoneFront.Id != 0) // caso de apagar um existente
                        {
                            context.Telefone.Attach(telefoneFront);
                            context.Telefone.Remove(telefoneFront);
                        }
                        else //caso de adicionar um novo
                        {
                            context.Telefone.Add(telefoneFront);
                        }
                    }
                }

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
