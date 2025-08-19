using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LamaApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class atributosContenidoImgPublicacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Contenido",
                table: "Publicacion",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "numeroLikes",
                table: "Publicacion",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "urlImagen",
                table: "Publicacion",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contenido",
                table: "Publicacion");

            migrationBuilder.DropColumn(
                name: "numeroLikes",
                table: "Publicacion");

            migrationBuilder.DropColumn(
                name: "urlImagen",
                table: "Publicacion");
        }
    }
}
