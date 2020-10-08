using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class Embalagem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmbalagemIdEmbalagem",
                table: "Produto",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Embalagem",
                columns: table => new
                {
                    IdEmbalagem = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    Preco = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Embalagem", x => x.IdEmbalagem);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produto_EmbalagemIdEmbalagem",
                table: "Produto",
                column: "EmbalagemIdEmbalagem");

            migrationBuilder.AddForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemIdEmbalagem",
                table: "Produto",
                column: "EmbalagemIdEmbalagem",
                principalTable: "Embalagem",
                principalColumn: "IdEmbalagem",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produto_Embalagem_EmbalagemIdEmbalagem",
                table: "Produto");

            migrationBuilder.DropTable(
                name: "Embalagem");

            migrationBuilder.DropIndex(
                name: "IX_Produto_EmbalagemIdEmbalagem",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "EmbalagemIdEmbalagem",
                table: "Produto");
        }
    }
}
