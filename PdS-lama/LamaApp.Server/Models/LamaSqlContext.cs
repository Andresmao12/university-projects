using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LamaApp.Server.Models
{
    public partial class LamaSqlContext : DbContext
    {
        public LamaSqlContext() { }

        public LamaSqlContext(DbContextOptions<LamaSqlContext> options)
            : base(options) { }

        public virtual DbSet<Capitulo> Capitulo { get; set; }
        public virtual DbSet<Contacto> Contacto { get; set; }
        public virtual DbSet<Evento> Evento { get; set; }
        public virtual DbSet<Inscripcion> Inscripcion { get; set; }
        public virtual DbSet<Motocicleta> Motocicleta { get; set; }
        public virtual DbSet<Pareja> Pareja { get; set; }
        public virtual DbSet<Publicacion> Publicacion { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Capitulo>(entity =>
            {
                entity.HasKey(e => e.IdCapitulo);
                entity.Property(e => e.IdCapitulo).HasColumnName("ID_Capitulo");
            });

            modelBuilder.Entity<Contacto>(entity =>
            {
                entity.HasKey(e => e.IdContacto);
                entity.Property(e => e.IdContacto).HasColumnName("ID_Contacto");

                // Relación uno a uno con Usuario
                entity.HasOne(e => e.Usuario)
                      .WithOne(e => e.Contacto)
                      .HasForeignKey<Contacto>(e => e.IdContacto);
            });

            modelBuilder.Entity<Evento>(entity =>
            {
                entity.HasKey(e => e.IdEvento);
                entity.HasIndex(e => e.IdCapitulo, "IX_Eventos_ID_Capitulo");
                entity.Property(e => e.IdEvento).HasColumnName("ID_Evento");
                entity.Property(e => e.FechaFin).HasColumnName("Fecha_Fin");
                entity.Property(e => e.FechaInicio).HasColumnName("Fecha_Inicio");
                entity.Property(e => e.IdCapitulo).HasColumnName("ID_Capitulo");

                entity.HasOne(d => d.Capitulo)
                      .WithMany(p => p.Eventos)
                      .HasForeignKey(d => d.IdCapitulo);
            });

            modelBuilder.Entity<Inscripcion>(entity =>
            {
                entity.HasKey(e => e.IdInscripcion);
                entity.HasIndex(e => e.IdEvento, "IX_Inscripciones_ID_Evento");
                entity.HasIndex(e => e.IdUsuario, "IX_Inscripciones_ID_Usuario");

                entity.Property(e => e.IdInscripcion).HasColumnName("ID_Inscripcion");
                entity.Property(e => e.FechaCompra).HasColumnName("Fecha_Compra");
                entity.Property(e => e.IdEvento).HasColumnName("ID_Evento");
                entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");

                entity.HasOne(d => d.Evento)
                      .WithMany(p => p.Inscripciones)
                      .HasForeignKey(d => d.IdEvento)
                      .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Usuario)
                      .WithMany(p => p.Inscripciones)
                      .HasForeignKey(d => d.IdUsuario)
                      .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Motocicleta>(entity =>
            {
                entity.HasKey(e => e.IdMotocicleta);
                entity.Property(e => e.IdMotocicleta).HasColumnName("ID_Motocicleta");
            });

            modelBuilder.Entity<Pareja>(entity =>
            {
                entity.HasKey(e => e.IdPareja);
                entity.Property(e => e.IdPareja).HasColumnName("ID_Pareja");
            });

            modelBuilder.Entity<Publicacion>(entity =>
            {
                entity.HasKey(e => e.IdPublicacion);
                entity.HasIndex(e => e.IdUsuario, "IX_Publicaciones_ID_Usuario");

                entity.Property(e => e.IdPublicacion).HasColumnName("ID_Publicacion");
                entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");

                entity.HasOne(d => d.Usuario)
                      .WithMany(p => p.Publicaciones)
                      .HasForeignKey(d => d.IdUsuario);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                // Establecer la clave primaria
                entity.HasKey(e => e.IdUsuario);

                // Crear un índice para la columna IdCapitulo
                entity.HasIndex(e => e.IdCapitulo, "IX_Usuarios_ID_Capitulo");

                // Configurar la propiedad de IdUsuario como una columna de identidad
                entity.Property(e => e.IdUsuario)
                      .ValueGeneratedOnAdd() // Cambiar a ValueGeneratedOnAdd para que se genere automáticamente
                      .HasColumnName("ID_Usuario");

                // Configurar otras propiedades
                entity.Property(e => e.Nombre) // Asumiendo que esta propiedad está en el modelo
                      .IsRequired() // Esta propiedad es requerida
                      .HasMaxLength(100) // Establecer longitud máxima
                      .HasColumnName("Nombre");

                entity.Property(e => e.Apellido) // Asumiendo que esta propiedad está en el modelo
                      .IsRequired() // Esta propiedad es requerida
                      .HasMaxLength(100) // Establecer longitud máxima
                      .HasColumnName("Apellido");

                entity.Property(e => e.Cedula) // Asumiendo que esta propiedad está en el modelo
                      .IsRequired() // Esta propiedad es requerida
                      .HasMaxLength(50) // Establecer longitud máxima
                      .HasColumnName("Cedula");

                entity.Property(e => e.FechaNacimiento)
                      .HasColumnName("Fecha_Nacimiento");

                entity.Property(e => e.FechaRegistro)
                      .HasColumnName("Fecha_Registro");

                entity.Property(e => e.IdCapitulo)
                      .HasColumnName("ID_Capitulo");

                entity.Property(e => e.IdContacto)
                      .HasColumnName("ID_Contacto");

                entity.Property(e => e.IdMotocicleta)
                      .HasColumnName("ID_Motocicleta");

                entity.Property(e => e.IdPareja)
                      .HasColumnName("ID_Pareja");

                entity.Property(e => e.NombreUsuario)
                      .HasColumnName("Nombre_Usuario");

                // Configuración de relaciones uno a muchos y uno a uno
                entity.HasOne(d => d.Capitulo)
                      .WithMany(p => p.Usuarios)
                      .HasForeignKey(d => d.IdCapitulo);

                entity.HasOne(d => d.Contacto)
                      .WithOne(p => p.Usuario)
                      .HasForeignKey<Usuario>(d => d.IdContacto);

                entity.HasOne(d => d.Motocicleta)
                      .WithOne(p => p.Usuario)
                      .HasForeignKey<Usuario>(d => d.IdMotocicleta);

                entity.HasOne(d => d.Pareja)
                      .WithOne(p => p.Usuario)
                      .HasForeignKey<Usuario>(d => d.IdPareja);
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
