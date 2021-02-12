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
            return context.Configuracao.Find(1);
        }

        public bool Put(Context context, Configuracao configuracao)
        {
            Configuracao configuracaoBanco = context.Configuracao.Find(1);
            configuracaoBanco.StatusAposPedido = context.Status.Find(configuracao.StatusAposPedido.Id);
            configuracaoBanco = configuracao;
            context.SaveChanges();
            return true;
        }
    }
}
