using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Usuario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;
    public string Contraseña { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Apellido { get; set; } = null!;
    public string Cedula { get; set; } = null!;
    public DateTime FechaNacimiento { get; set; } = DateTime.Now;
    public DateTime FechaRegistro { get; set; } = DateTime.Now;

    public int? IdContacto { get; set; }
    public int? IdPareja { get; set; }
    public int IdCapitulo { get; set; } // Relación obligatoria
    public int? IdMotocicleta { get; set; }

    // Relaciones con entidades que pueden ser nulas
    public virtual Capitulo Capitulo { get; set; } = null!;
    public virtual Motocicleta? Motocicleta { get; set; }
    public virtual Pareja? Pareja { get; set; } 
    public virtual Contacto? Contacto { get; set; }

    public virtual ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
    public virtual ICollection<Publicacion> Publicaciones { get; set; } = new List<Publicacion>();

}