using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class StatusConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Configuracao_Status_StatusAposPedidoId",
                table: "Configuracao");

            migrationBuilder.RenameColumn(
                name: "StatusAposPedidoId",
                table: "Configuracao",
                newName: "StatusInicioPedidoId");

            migrationBuilder.RenameIndex(
                name: "IX_Configuracao_StatusAposPedidoId",
                table: "Configuracao",
                newName: "IX_Configuracao_StatusInicioPedidoId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Preco",
                table: "Produto",
                type: "decimal(5,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Preco",
                table: "Embalagem",
                type: "decimal(5,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "StatusFinalPedidoId",
                table: "Configuracao",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Configuracao_StatusFinalPedidoId",
                table: "Configuracao",
                column: "StatusFinalPedidoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Configuracao_Status_StatusFinalPedidoId",
                table: "Configuracao",
                column: "StatusFinalPedidoId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Configuracao_Status_StatusInicioPedidoId",
                table: "Configuracao",
                column: "StatusInicioPedidoId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Configuracao_Status_StatusFinalPedidoId",
                table: "Configuracao");

            migrationBuilder.DropForeignKey(
                name: "FK_Configuracao_Status_StatusInicioPedidoId",
                table: "Configuracao");

            migrationBuilder.DropIndex(
                name: "IX_Configuracao_StatusFinalPedidoId",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "StatusFinalPedidoId",
                table: "Configuracao");

            migrationBuilder.RenameColumn(
                name: "StatusInicioPedidoId",
                table: "Configuracao",
                newName: "StatusAposPedidoId");

            migrationBuilder.RenameIndex(
                name: "IX_Configuracao_StatusInicioPedidoId",
                table: "Configuracao",
                newName: "IX_Configuracao_StatusAposPedidoId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Preco",
                table: "Produto",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Preco",
                table: "Embalagem",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)");

            migrationBuilder.AddForeignKey(
                name: "FK_Configuracao_Status_StatusAposPedidoId",
                table: "Configuracao",
                column: "StatusAposPedidoId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
