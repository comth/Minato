using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using Minato.Util;
using System.Linq;

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

            //nunca comentar a próxima linha
            configuracao.KeyDistanceMatrix = null;

            //caso de não haver configuracao
            if (configuracao == null)
            {
                configuracao = new Configuracao(){};
                context.Add(configuracao);
                context.SaveChanges();
            }

            return configuracao;
        }

        public bool Put(Context context, Configuracao configuracao, IDataProtectionProvider dataProtectionProvider)
        {
            if (configuracao.StatusInicioPedido != null)
                configuracao.StatusInicioPedido = context.Status.Find(configuracao.StatusInicioPedido.Id);


            if (configuracao.StatusFinalPedido != null)
                configuracao.StatusFinalPedido = context.Status.Find(configuracao.StatusFinalPedido.Id);

            context.Entry(configuracao).State = EntityState.Modified;
            context.SaveChanges();
            context.Entry(configuracao).State = EntityState.Detached;

            Configuracao configuracaoBanco = context.Configuracao
                    .Include(x => x.StatusInicioPedido)
                    .Include(x => x.StatusFinalPedido)
                    .First(x => x.Id == configuracao.Id);

            if (configuracao.StatusInicioPedido == null || configuracao.StatusFinalPedido == null)
            {
                if(configuracao.StatusInicioPedido == null) configuracaoBanco.StatusInicioPedido = null;
                if(configuracao.StatusFinalPedido == null) configuracaoBanco.StatusFinalPedido = null;
            }

            if (configuracao.KeyDistanceMatrix.Trim().Length != 0)
            {
                var protectionProvider = new ProtectionProvider(dataProtectionProvider);
                configuracaoBanco.KeyDistanceMatrix = protectionProvider.Encrypt(configuracao.KeyDistanceMatrix);
            }
            //configuracaoBanco = configuracao;
            context.SaveChanges();
            return true;
        }
    }
}
