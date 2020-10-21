using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class ids : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Endereco_Usuario_UsuarioIdUsuario",
                table: "Endereco");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Endereco_EnderecoSelecionadoIdEndereco",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_UsuarioIdUsuario",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemIdEmbalagem",
                table: "Produto");

            migrationBuilder.DropForeignKey(
                name: "FK_Produto_Pedido_PedidoIdPedido_PedidoDataPedido",
                table: "Produto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Produto",
                table: "Produto");

            migrationBuilder.DropIndex(
                name: "IX_Produto_EmbalagemIdEmbalagem",
                table: "Produto");

            migrationBuilder.DropIndex(
                name: "IX_Produto_PedidoIdPedido_PedidoDataPedido",
                table: "Produto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_EnderecoSelecionadoIdEndereco",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_UsuarioIdUsuario",
                table: "Pedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Endereco",
                table: "Endereco");

            migrationBuilder.DropIndex(
                name: "IX_Endereco_UsuarioIdUsuario",
                table: "Endereco");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Embalagem",
                table: "Embalagem");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "IdProduto",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "EmbalagemIdEmbalagem",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "PedidoIdPedido",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "IdPedido",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "EnderecoSelecionadoIdEndereco",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "UsuarioIdUsuario",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "IdEndereco",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "UsuarioIdUsuario",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "IdEmbalagem",
                table: "Embalagem");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Usuario",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Produto",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "EmbalagemId",
                table: "Produto",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PedidoId",
                table: "Produto",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Pedido",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EnderecoSelecionadoId",
                table: "Pedido",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Pedido",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Endereco",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Endereco",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Embalagem",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produto",
                table: "Produto",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido",
                columns: new[] { "Id", "DataPedido" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Endereco",
                table: "Endereco",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Embalagem",
                table: "Embalagem",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_EmbalagemId",
                table: "Produto",
                column: "EmbalagemId");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_PedidoId_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoId", "PedidoDataPedido" });

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_EnderecoSelecionadoId",
                table: "Pedido",
                column: "EnderecoSelecionadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Endereco_UsuarioId",
                table: "Endereco",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Endereco_Usuario_UsuarioId",
                table: "Endereco",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Endereco_EnderecoSelecionadoId",
                table: "Pedido",
                column: "EnderecoSelecionadoId",
                principalTable: "Endereco",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemId",
                table: "Produto",
                column: "EmbalagemId",
                principalTable: "Embalagem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Produto_Pedido_PedidoId_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoId", "PedidoDataPedido" },
                principalTable: "Pedido",
                principalColumns: new[] { "Id", "DataPedido" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Endereco_Usuario_UsuarioId",
                table: "Endereco");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Endereco_EnderecoSelecionadoId",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_Usuario_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemId",
                table: "Produto");

            migrationBuilder.DropForeignKey(
                name: "FK_Produto_Pedido_PedidoId_PedidoDataPedido",
                table: "Produto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Produto",
                table: "Produto");

            migrationBuilder.DropIndex(
                name: "IX_Produto_EmbalagemId",
                table: "Produto");

            migrationBuilder.DropIndex(
                name: "IX_Produto_PedidoId_PedidoDataPedido",
                table: "Produto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_EnderecoSelecionadoId",
                table: "Pedido");

            migrationBuilder.DropIndex(
                name: "IX_Pedido_UsuarioId",
                table: "Pedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Endereco",
                table: "Endereco");

            migrationBuilder.DropIndex(
                name: "IX_Endereco_UsuarioId",
                table: "Endereco");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Embalagem",
                table: "Embalagem");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "EmbalagemId",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "PedidoId",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "EnderecoSelecionadoId",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Embalagem");

            migrationBuilder.AddColumn<int>(
                name: "IdUsuario",
                table: "Usuario",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "IdProduto",
                table: "Produto",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "EmbalagemIdEmbalagem",
                table: "Produto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PedidoIdPedido",
                table: "Produto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdPedido",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EnderecoSelecionadoIdEndereco",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioIdUsuario",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdEndereco",
                table: "Endereco",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioIdUsuario",
                table: "Endereco",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdEmbalagem",
                table: "Embalagem",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario",
                column: "IdUsuario");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produto",
                table: "Produto",
                column: "IdProduto");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido",
                columns: new[] { "IdPedido", "DataPedido" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Endereco",
                table: "Endereco",
                column: "IdEndereco");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Embalagem",
                table: "Embalagem",
                column: "IdEmbalagem");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_EmbalagemIdEmbalagem",
                table: "Produto",
                column: "EmbalagemIdEmbalagem");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_PedidoIdPedido_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoIdPedido", "PedidoDataPedido" });

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_EnderecoSelecionadoIdEndereco",
                table: "Pedido",
                column: "EnderecoSelecionadoIdEndereco");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioIdUsuario",
                table: "Pedido",
                column: "UsuarioIdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Endereco_UsuarioIdUsuario",
                table: "Endereco",
                column: "UsuarioIdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Endereco_Usuario_UsuarioIdUsuario",
                table: "Endereco",
                column: "UsuarioIdUsuario",
                principalTable: "Usuario",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Endereco_EnderecoSelecionadoIdEndereco",
                table: "Pedido",
                column: "EnderecoSelecionadoIdEndereco",
                principalTable: "Endereco",
                principalColumn: "IdEndereco",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_Usuario_UsuarioIdUsuario",
                table: "Pedido",
                column: "UsuarioIdUsuario",
                principalTable: "Usuario",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemIdEmbalagem",
                table: "Produto",
                column: "EmbalagemIdEmbalagem",
                principalTable: "Embalagem",
                principalColumn: "IdEmbalagem",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Produto_Pedido_PedidoIdPedido_PedidoDataPedido",
                table: "Produto",
                columns: new[] { "PedidoIdPedido", "PedidoDataPedido" },
                principalTable: "Pedido",
                principalColumns: new[] { "IdPedido", "DataPedido" },
                onDelete: ReferentialAction.Restrict);
        }
    }
}
