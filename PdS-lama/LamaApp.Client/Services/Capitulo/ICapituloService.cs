using LamaApp.Shared;

namespace LamaApp.Client.Services.Capitulos
{
    public interface ICapituloService
    {

        Task<List<CapituloSh>> GetCapitulos();
        Task<CapituloSh> GetCapitulo(int id);
        Task<CapituloSh> AddCapitulo(CapituloSh capitulo);
        Task<CapituloSh> UpdateCapitulo(CapituloSh capitulo);
        Task<ResponseApi<bool>> deleteCapitulo(int idCapitulo);

    }
}
