﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Minato.Contexts;

namespace Minato.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20210330194047_TempoPreparo")]
    partial class TempoPreparo
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Minato.Models.Configuracao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CepRestaurante")
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<bool>("CobrarEntrega")
                        .HasColumnType("bit");

                    b.Property<bool>("CobrarPorcentGar")
                        .HasColumnType("bit");

                    b.Property<bool>("EntregaFixa")
                        .HasColumnType("bit");

                    b.Property<string>("KeyDistanceMatrix")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomeExibicao")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<decimal>("PorcentGar")
                        .HasColumnType("decimal(5,2)");

                    b.Property<decimal>("PrecoPorKm")
                        .HasColumnType("decimal(5,2)");

                    b.Property<int?>("StatusFinalPedidoId")
                        .HasColumnType("int");

                    b.Property<int?>("StatusInicioPedidoId")
                        .HasColumnType("int");

                    b.Property<decimal>("ValorEntregaFixa")
                        .HasColumnType("decimal(5,2)");

                    b.HasKey("Id");

                    b.HasIndex("StatusFinalPedidoId");

                    b.HasIndex("StatusInicioPedidoId");

                    b.ToTable("Configuracao");
                });

            modelBuilder.Entity("Minato.Models.Embalagem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(5,2)");

                    b.HasKey("Id");

                    b.ToTable("Embalagem");
                });

            modelBuilder.Entity("Minato.Models.Endereco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<int?>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int?>("StatusId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.HasIndex("StatusId");

                    b.ToTable("Mesa");
                });

            modelBuilder.Entity("Minato.Models.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataPedido")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EnderecoSelecionadoId")
                        .HasColumnType("int");

                    b.Property<string>("Observacao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PedidoEncerrado")
                        .HasColumnType("bit");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(7,2)");

                    b.Property<decimal>("PrecoEntrega")
                        .HasColumnType("decimal(5,2)");

                    b.Property<int>("TempoEntrega")
                        .HasColumnType("int");

                    b.Property<int>("TipoPedido")
                        .HasColumnType("int");

                    b.Property<int?>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EnderecoSelecionadoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Pedido");
                });

            modelBuilder.Entity("Minato.Models.Produto", b =>
                {
                    b.Property<int>("IdBanco")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("EmbalagemId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(7,2)");

                    b.Property<int>("TempoPreparo")
                        .HasColumnType("int");

                    b.HasKey("IdBanco");

                    b.HasIndex("EmbalagemId");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("Minato.Models.ProdutoPedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Observacao")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<int?>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int?>("ProdutoIdBanco")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.HasIndex("ProdutoIdBanco");

                    b.ToTable("ProdutoPedido");
                });

            modelBuilder.Entity("Minato.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Minato.Models.Configuracao", b =>
                {
                    b.HasOne("Minato.Models.Status", "StatusFinalPedido")
                        .WithMany()
                        .HasForeignKey("StatusFinalPedidoId");

                    b.HasOne("Minato.Models.Status", "StatusInicioPedido")
                        .WithMany()
                        .HasForeignKey("StatusInicioPedidoId");

                    b.Navigation("StatusFinalPedido");

                    b.Navigation("StatusInicioPedido");
                });

            modelBuilder.Entity("Minato.Models.Endereco", b =>
                {
                    b.HasOne("Minato.Models.Usuario", null)
                        .WithMany("Enderecos")
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Minato.Models.Mesa", b =>
                {
                    b.HasOne("Minato.Models.Pedido", "Pedido")
                        .WithMany()
                        .HasForeignKey("PedidoId");

                    b.HasOne("Minato.Models.Status", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId");

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
                    b.HasOne("Minato.Models.Pedido", null)
                        .WithMany("Produtos")
                        .HasForeignKey("PedidoId");

                    b.HasOne("Minato.Models.Produto", "Produto")
                        .WithMany()
                        .HasForeignKey("ProdutoIdBanco");

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
