using LamaApp.Shared;

namespace LamaApp.Client.Services.Publicacion
{
    public interface IPublicacionService
    {

        Task<List<PublicacionSh>> obtenerPublicaciones();

        Task<ResponseApi<bool>> crearPublicacion(PublicacionSh publicacionSh, UsuarioSh usuarioSh);

    }
}
