using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Publicacion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdPublicacion { get; set; }

    public DateTime Fecha { get; set; } = DateTime.Now;

    public string Contenido { get; set; }

    public string? urlImagen { get; set; } = null;

    public int numeroLikes { get; set; } = 0;

    public int IdUsuario { get; set; }

    [ForeignKey(nameof(IdUsuario))]
    public virtual Usuario Usuario { get; set; } = null!;
}
