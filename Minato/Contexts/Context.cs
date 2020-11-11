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

        public Context(DbContextOptions<Context> options)
        : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pedido>()
                .HasKey(p => new { p.Id, p.DataPedido });

            //modelBuilder.Entity<Endereco>()
            //    .HasOne(p => p.Usuario)
            //    .WithMany(b => b.Enderecos)
            //    .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Telefone>()
            //    .HasOne(p => p.Usuario)
            //    .WithMany(b => b.Telefones)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
