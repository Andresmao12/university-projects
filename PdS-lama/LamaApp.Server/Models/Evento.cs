using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Evento
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdEvento { get; set; }
    public string Titulo { get; set; } = null!;

    public DateTime FechaInicio { get; set; }

    public DateTime FechaFin { get; set; }

    public string Ubicacion { get; set; } = null!;

    public string Creador { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int IdCapitulo { get; set; }

    //public virtual Capitulo Capitulo { get; set; } = null!;

    [ForeignKey("IdCapitulo")]
    public virtual Capitulo? Capitulo { get; set; }
    public virtual ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
}
