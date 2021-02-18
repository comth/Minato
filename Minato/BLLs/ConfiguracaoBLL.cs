using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.BLLs
{
    public class ConfiguracaoBLL
    {
        public Configuracao Get(Context context)
        {
            var configuracao = context.Configuracao
                .Include(x => x.StatusInicioPedido)
                .Include(x => x.StatusFinalPedido)
                .First(x => x.Id == 1);

            //caso de não haver configuracao
            if (configuracao == null)
            {
                configuracao = new Configuracao(){};
                context.Add(configuracao);
                context.SaveChanges();
            }

            return configuracao;
        }

        public bool Put(Context context, Configuracao configuracao)
        {
            if (configuracao.StatusInicioPedido != null)
                configuracao.StatusInicioPedido = context.Status.Find(configuracao.StatusInicioPedido.Id);


            if (configuracao.StatusFinalPedido != null)
                configuracao.StatusFinalPedido = context.Status.Find(configuracao.StatusFinalPedido.Id);

            context.Entry(configuracao).State = EntityState.Modified;
            context.SaveChanges();
            context.Entry(configuracao).State = EntityState.Detached;

            if (configuracao.StatusInicioPedido == null || configuracao.StatusFinalPedido == null)
            {
                Configuracao configuracaoBanco = context.Configuracao
                    .Include(x => x.StatusInicioPedido)
                    .Include(x => x.StatusFinalPedido)
                    .First(x => x.Id == configuracao.Id);

                if(configuracao.StatusInicioPedido == null) configuracaoBanco.StatusInicioPedido = null;
                if(configuracao.StatusFinalPedido == null) configuracaoBanco.StatusFinalPedido = null;
                configuracaoBanco = configuracao;
            }
            context.SaveChanges();
            return true;
        }
    }
}
