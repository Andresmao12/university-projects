using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LamaApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class firstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Capitulo",
                columns: table => new
                {
                    ID_Capitulo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pais = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ciudad = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Capitulo", x => x.ID_Capitulo);
                });

            migrationBuilder.CreateTable(
                name: "Contacto",
                columns: table => new
                {
                    ID_Contacto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Celular = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacto", x => x.ID_Contacto);
                });

            migrationBuilder.CreateTable(
                name: "Motocicleta",
                columns: table => new
                {
                    ID_Motocicleta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marca = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Modelo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cilindrada = table.Column<int>(type: "int", nullable: false),
                    Placa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motocicleta", x => x.ID_Motocicleta);
                });

            migrationBuilder.CreateTable(
                name: "Pareja",
                columns: table => new
                {
                    ID_Pareja = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cedula = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pareja", x => x.ID_Pareja);
                });

            migrationBuilder.CreateTable(
                name: "Evento",
                columns: table => new
                {
                    ID_Evento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha_Inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fecha_Fin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Creador = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ID_Capitulo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evento", x => x.ID_Evento);
                    table.ForeignKey(
                        name: "FK_Evento_Capitulo_ID_Capitulo",
                        column: x => x.ID_Capitulo,
                        principalTable: "Capitulo",
                        principalColumn: "ID_Capitulo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre_Usuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contraseña = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Cedula = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Fecha_Nacimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fecha_Registro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ID_Contacto = table.Column<int>(type: "int", nullable: true),
                    ID_Pareja = table.Column<int>(type: "int", nullable: true),
                    ID_Capitulo = table.Column<int>(type: "int", nullable: false),
                    ID_Motocicleta = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.ID_Usuario);
                    table.ForeignKey(
                        name: "FK_Usuario_Capitulo_ID_Capitulo",
                        column: x => x.ID_Capitulo,
                        principalTable: "Capitulo",
                        principalColumn: "ID_Capitulo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Usuario_Contacto_ID_Contacto",
                        column: x => x.ID_Contacto,
                        principalTable: "Contacto",
                        principalColumn: "ID_Contacto");
                    table.ForeignKey(
                        name: "FK_Usuario_Motocicleta_ID_Motocicleta",
                        column: x => x.ID_Motocicleta,
                        principalTable: "Motocicleta",
                        principalColumn: "ID_Motocicleta");
                    table.ForeignKey(
                        name: "FK_Usuario_Pareja_ID_Pareja",
                        column: x => x.ID_Pareja,
                        principalTable: "Pareja",
                        principalColumn: "ID_Pareja");
                });

            migrationBuilder.CreateTable(
                name: "Inscripcion",
                columns: table => new
                {
                    ID_Inscripcion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha_Compra = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ID_Evento = table.Column<int>(type: "int", nullable: false),
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inscripcion", x => x.ID_Inscripcion);
                    table.ForeignKey(
                        name: "FK_Inscripcion_Evento_ID_Evento",
                        column: x => x.ID_Evento,
                        principalTable: "Evento",
                        principalColumn: "ID_Evento");
                    table.ForeignKey(
                        name: "FK_Inscripcion_Usuario_ID_Usuario",
                        column: x => x.ID_Usuario,
                        principalTable: "Usuario",
                        principalColumn: "ID_Usuario");
                });

            migrationBuilder.CreateTable(
                name: "Publicacion",
                columns: table => new
                {
                    ID_Publicacion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publicacion", x => x.ID_Publicacion);
                    table.ForeignKey(
                        name: "FK_Publicacion_Usuario_ID_Usuario",
                        column: x => x.ID_Usuario,
                        principalTable: "Usuario",
                        principalColumn: "ID_Usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_ID_Capitulo",
                table: "Evento",
                column: "ID_Capitulo");

            migrationBuilder.CreateIndex(
                name: "IX_Inscripciones_ID_Evento",
                table: "Inscripcion",
                column: "ID_Evento");

            migrationBuilder.CreateIndex(
                name: "IX_Inscripciones_ID_Usuario",
                table: "Inscripcion",
                column: "ID_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Publicaciones_ID_Usuario",
                table: "Publicacion",
                column: "ID_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_ID_Contacto",
                table: "Usuario",
                column: "ID_Contacto",
                unique: true,
                filter: "[ID_Contacto] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_ID_Motocicleta",
                table: "Usuario",
                column: "ID_Motocicleta",
                unique: true,
                filter: "[ID_Motocicleta] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_ID_Pareja",
                table: "Usuario",
                column: "ID_Pareja",
                unique: true,
                filter: "[ID_Pareja] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_ID_Capitulo",
                table: "Usuario",
                column: "ID_Capitulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inscripcion");

            migrationBuilder.DropTable(
                name: "Publicacion");

            migrationBuilder.DropTable(
                name: "Evento");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Capitulo");

            migrationBuilder.DropTable(
                name: "Contacto");

            migrationBuilder.DropTable(
                name: "Motocicleta");

            migrationBuilder.DropTable(
                name: "Pareja");
        }
    }
}
