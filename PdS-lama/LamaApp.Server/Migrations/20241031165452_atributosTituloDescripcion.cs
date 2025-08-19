using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LamaApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class atributosTituloDescripcion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Titulo",
                table: "Evento",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "Capitulo",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Titulo",
                table: "Evento");

            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "Capitulo");
        }
    }
}
