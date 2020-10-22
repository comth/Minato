using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Embalagem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    Preco = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Embalagem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Endereco",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Bairro = table.Column<string>(maxLength: 60, nullable: false),
                    Cep = table.Column<string>(maxLength: 8, nullable: false),
                    Logradouro = table.Column<string>(maxLength: 80, nullable: false),
                    Complemento = table.Column<string>(maxLength: 60, nullable: false),
                    Observacao = table.Column<string>(maxLength: 80, nullable: true),
                    Uf = table.Column<string>(maxLength: 2, nullable: false),
                    UsuarioId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Endereco", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Endereco_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pedido",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    DataPedido = table.Column<DateTime>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    IdEndereco = table.Column<int>(nullable: false),
                    EnderecoSelecionadoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedido", x => new { x.Id, x.DataPedido });
                    table.ForeignKey(
                        name: "FK_Pedido_Endereco_EnderecoSelecionadoId",
                        column: x => x.EnderecoSelecionadoId,
                        principalTable: "Endereco",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pedido_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    IdBanco = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    Preco = table.Column<decimal>(nullable: false),
                    EmbalagemId = table.Column<int>(nullable: true),
                    PedidoDataPedido = table.Column<DateTime>(nullable: true),
                    PedidoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produto", x => x.IdBanco);
                    table.ForeignKey(
                        name: "FK_Produto_Embalagem_EmbalagemId",
                        column: x => x.EmbalagemId,
                        principalTable: "Embalagem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Produto_Pedido_PedidoId_PedidoDataPedido",
                        columns: x => new { x.PedidoId, x.PedidoDataPedido },
                        principalTable: "Pedido",
                        principalColumns: new[] { "Id", "DataPedido" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Endereco_UsuarioId",
                table: "Endereco",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_EnderecoSelecionadoId",
                table: "Pedido",
                column: "EnderecoSelecionadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_EmbalagemId",
                table: "Produto",
                column: "EmbalagemId");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_PedidoId_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoId", "PedidoDataPedido" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produto");

            migrationBuilder.DropTable(
                name: "Embalagem");

            migrationBuilder.DropTable(
                name: "Pedido");

            migrationBuilder.DropTable(
                name: "Endereco");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
