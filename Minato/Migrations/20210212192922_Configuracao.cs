using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class Configuracao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Configuracao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusAposPedidoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuracao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Configuracao_Status_StatusAposPedidoId",
                        column: x => x.StatusAposPedidoId,
                        principalTable: "Status",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Configuracao_StatusAposPedidoId",
                table: "Configuracao",
                column: "StatusAposPedidoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configuracao");
        }
    }
}
