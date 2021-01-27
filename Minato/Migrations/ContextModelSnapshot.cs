﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Minato.Contexts;

namespace Minato.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Minato.Models.Embalagem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Embalagem");
                });

            modelBuilder.Entity("Minato.Models.Endereco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("Cep")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<string>("Complemento")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("Localidade")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("Logradouro")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Observacao")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("Uf")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<int?>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Endereco");
                });

            modelBuilder.Entity("Minato.Models.Mesa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<DateTime?>("PedidoDataPedido")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int?>("StatusId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StatusId");

                    b.HasIndex("PedidoId", "PedidoDataPedido");

                    b.ToTable("Mesa");
                });

            modelBuilder.Entity("Minato.Models.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("DataPedido")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EnderecoSelecionadoId")
                        .HasColumnType("int");

                    b.Property<bool>("PedidoLocal")
                        .HasColumnType("bit");

                    b.Property<int?>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id", "DataPedido");

                    b.HasIndex("EnderecoSelecionadoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Pedido");
                });

            modelBuilder.Entity("Minato.Models.Produto", b =>
                {
                    b.Property<int>("IdBanco")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("EmbalagemId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("IdBanco");

                    b.HasIndex("EmbalagemId");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("Minato.Models.ProdutoPedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Observacao")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<DateTime?>("PedidoDataPedido")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int?>("ProdutoIdBanco")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProdutoIdBanco");

                    b.HasIndex("PedidoId", "PedidoDataPedido");

                    b.ToTable("ProdutoPedido");
                });

            modelBuilder.Entity("Minato.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Cor")
                        .IsRequired()
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Status");
                });

            modelBuilder.Entity("Minato.Models.Telefone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Telefone");
                });

            modelBuilder.Entity("Minato.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Minato.Models.Endereco", b =>
                {
                    b.HasOne("Minato.Models.Usuario", null)
                        .WithMany("Enderecos")
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Minato.Models.Mesa", b =>
                {
                    b.HasOne("Minato.Models.Status", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId");

                    b.HasOne("Minato.Models.Pedido", "Pedido")
                        .WithMany()
                        .HasForeignKey("PedidoId", "PedidoDataPedido");

                    b.Navigation("Pedido");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("Minato.Models.Pedido", b =>
                {
                    b.HasOne("Minato.Models.Endereco", "EnderecoSelecionado")
                        .WithMany()
                        .HasForeignKey("EnderecoSelecionadoId");

                    b.HasOne("Minato.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId");

                    b.Navigation("EnderecoSelecionado");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Minato.Models.Produto", b =>
                {
                    b.HasOne("Minato.Models.Embalagem", "Embalagem")
                        .WithMany()
                        .HasForeignKey("EmbalagemId");

                    b.Navigation("Embalagem");
                });

            modelBuilder.Entity("Minato.Models.ProdutoPedido", b =>
                {
                    b.HasOne("Minato.Models.Produto", "Produto")
                        .WithMany()
                        .HasForeignKey("ProdutoIdBanco");

                    b.HasOne("Minato.Models.Pedido", null)
                        .WithMany("Produtos")
                        .HasForeignKey("PedidoId", "PedidoDataPedido");

                    b.Navigation("Produto");
                });

            modelBuilder.Entity("Minato.Models.Telefone", b =>
                {
                    b.HasOne("Minato.Models.Usuario", null)
                        .WithMany("Telefones")
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Minato.Models.Pedido", b =>
                {
                    b.Navigation("Produtos");
                });

            modelBuilder.Entity("Minato.Models.Usuario", b =>
                {
                    b.Navigation("Enderecos");

                    b.Navigation("Telefones");
                });
#pragma warning restore 612, 618
        }
    }
}
