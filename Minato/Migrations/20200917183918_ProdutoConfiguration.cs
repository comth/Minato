using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class ProdutoConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    IdProduto = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    Preco = table.Column<decimal>(nullable: false),
                    PedidoDataPedido = table.Column<DateTime>(nullable: true),
                    PedidoIdPedido = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produto", x => x.IdProduto);
                    table.ForeignKey(
                        name: "FK_Produto_Pedido_PedidoIdPedido_PedidoDataPedido",
                        columns: x => new { x.PedidoIdPedido, x.PedidoDataPedido },
                        principalTable: "Pedido",
                        principalColumns: new[] { "IdPedido", "DataPedido" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produto_PedidoIdPedido_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoIdPedido", "PedidoDataPedido" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produto");
        }
    }
}
