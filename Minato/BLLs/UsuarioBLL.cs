using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System;
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

                TratarEnderecos(context, usuarioBanco.Enderecos, usuario.Enderecos);

                TratarTelefones(context, usuarioBanco.Telefones, usuario.Telefones);

                context.Entry(usuario).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        private void TratarEnderecos(Context context, List<Endereco> enderecosBanco, List<Endereco> enderecosFront)
        {
            List<int> idsFront = new List<int>();
            List<int> idsBanco = new List<int>();

            foreach (var enderecoBanco in enderecosBanco)
            {
                context.Entry(enderecoBanco).State = EntityState.Detached;
                idsBanco.Add(enderecoBanco.Id);
            }

            foreach (var enderecoFront in enderecosFront)
            {
                bool existsBanco = idsBanco.Any(x => x == enderecoFront.Id);

                if (existsBanco)  //caso de atualizar exitente
                {
                    context.Entry(enderecoFront).State = EntityState.Modified;
                }
                else if (enderecoFront.Id == 0) //caso de adicionar um novo
                {
                    context.Endereco.Add(enderecoFront);
                }

                idsFront.Add(enderecoFront.Id);
            }

            // caso de apagar um existente
            foreach (var enderecoBanco in enderecosBanco)
            {
                bool existsFront = idsFront.Any(x => x == enderecoBanco.Id);

                if (!existsFront)
                {
                    context.Endereco.Attach(enderecoBanco);
                    context.Endereco.Remove(enderecoBanco);
                }
            }
        }

        private void TratarTelefones(Context context, List<Telefone> telefonesBanco, List<Telefone> telefonesFront)
        {
            List<int> idsFront = new List<int>();
            List<int> idsBanco = new List<int>();

            foreach (var telefoneBanco in telefonesBanco)
            {
                context.Entry(telefoneBanco).State = EntityState.Detached;
                idsBanco.Add(telefoneBanco.Id);
            }

            foreach (var telefoneFront in telefonesFront)
            {
                bool existsBanco = idsBanco.Any(x => x == telefoneFront.Id);

                if (existsBanco)  //caso de atualizar exitente
                {
                    context.Entry(telefoneFront).State = EntityState.Modified;
                }
                else if (telefoneFront.Id == 0) //caso de adicionar um novo
                {
                    context.Telefone.Add(telefoneFront);
                }

                idsFront.Add(telefoneFront.Id);
            }

            // caso de apagar um existente
            foreach (var telefoneBanco in telefonesBanco)
            {
                bool existsFront = idsFront.Any(x => x == telefoneBanco.Id);

                if (!existsFront)
                {
                    context.Telefone.Attach(telefoneBanco);
                    context.Telefone.Remove(telefoneBanco);
                }
            }
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
