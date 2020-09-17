using Microsoft.EntityFrameworkCore;
using Minato.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.Contexts
{
    public class Context : DbContext
    {
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Endereco> Endereco { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        public Context(DbContextOptions<Context> options)
        : base(options)
        { }
    }
}
