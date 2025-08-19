using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Contacto
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdContacto { get; set; }

    public string Direccion { get; set; }
    public string Correo { get; set; } = null!;
    public string Celular { get; set; } = null!;

    public int IdUsuario { get; set; } // Clave foránea para Usuario

    // Relación uno a uno
    [ForeignKey("IdUsuario")]
    public virtual Usuario Usuario { get; set; } = null!;
}
