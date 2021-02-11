using Microsoft.EntityFrameworkCore;
using Minato.Models;

namespace Minato.Contexts
{
    public class Context : DbContext
    {
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Endereco> Endereco { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Embalagem> Embalagem { get; set; }
        public DbSet<Mesa> Mesa { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<ProdutoPedido> ProdutoPedido { get; set; }
        public DbSet<Telefone> Telefone { get; set; }

        public Context(DbContextOptions<Context> options)
        : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
