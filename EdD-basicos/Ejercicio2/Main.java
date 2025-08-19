package Ejercicio2;

import java.io.*;

public class Main {

    public static BufferedReader kb = new BufferedReader(new InputStreamReader(System.in));

    public static void main(String[] args) throws IOException {

        //CREACION DE ARCHIVO EN CASO DE QUE NO EXISTA
        ManejoArchivo.crearArchivoMascotas();
        ManejoArchivo.crearArchivoNovedades();

        //DECLARACIÓN DE MENUS
        String menu = Helpers.menuPrincipal();
        String menuConsultas = Helpers.menuConsultas();
        String menuActualizacion = Helpers.menuActualizacion();
        String menuNovedades = Helpers.menuNovedades();

        //DECLARACION DE VARIABLES
        int opcionPrincipal = 0;

        do {
            Helpers.print("\n" + menu);
            Helpers.print("Digite su opción: ");
            opcionPrincipal = Integer.parseInt(kb.readLine());

            switch (opcionPrincipal) {
                case 1:
                    Helpers.print(menuConsultas);
                    consultar();
                    break;
                case 2:
                    Helpers.print(menuActualizacion);
                    actualizar();
                    break;
                case 3:
                    Helpers.print(menuNovedades);
                    novedades();
                    break;
                case 0:
                    Helpers.print("Saliendo del sistema...");
                    break;
                default:
                    Helpers.print("Opción no válida. Intente de nuevo.");

            }
        } while (opcionPrincipal != 0);
    }

    private static void consultar() throws IOException {
        int opcionConsulta = Integer.parseInt(kb.readLine());
        ListaMascotas lista = ManejoArchivo.leerArchivoMascotas();

        switch (opcionConsulta) {
            case 1:
                Helpers.print("Ingrese el código de la mascota:");
                String codigo = kb.readLine();
                NodoMascota mascotaCodigo = lista.buscarPorCodigo(codigo);
                if (mascotaCodigo != null) {
                    Helpers.print("Mascota encontrada: " + mascotaCodigo.getCodigo() + ", " + mascotaCodigo.getNombre());
                } else {
                    Helpers.print("Mascota no encontrada.");
                }
                break;
            case 2:
                Helpers.print("Ingrese el nombre de la mascota:");
                String nombre = kb.readLine();
                NodoMascota mascotaNombre = lista.buscarPorNombre(nombre);
                if (mascotaNombre != null) {
                    Helpers.print("Mascota encontrada: " + mascotaNombre.getCodigo() + ", " + mascotaNombre.getNombre());
                } else {
                    Helpers.print("Mascota no encontrada.");
                }
                break;
            case 0:
                Helpers.print("Volviendo al menú principal...");
                break;
            default:
                Helpers.print("Opción no válida. Intente de nuevo.");
        }
    }

    private static void actualizar() throws IOException {
        int opcionActualizacion = Integer.parseInt(kb.readLine());
        ListaMascotas lista = ManejoArchivo.leerArchivoMascotas();

        switch (opcionActualizacion) {
            case 1:
                Helpers.print("Ingrese el código de la nueva mascota:");
                String codigoNuevo = kb.readLine();
                Helpers.print("Ingrese el nombre de la nueva mascota:");
                String nombreNuevo = kb.readLine();
                ManejoArchivo.ingresarDatosMascota(codigoNuevo, nombreNuevo);
                break;
            case 2:
                Helpers.print("Ingrese el código de la mascota a eliminar:");
                String codigoEliminar = kb.readLine();
                lista.eliminar(codigoEliminar);
                ManejoArchivo.escribirArchivoMascotas(lista);
                break;
            case 3:
                Helpers.print("Ingrese el código de la mascota a modificar:");
                String codigoModificar = kb.readLine();
                Helpers.print("Ingrese el nuevo nombre de la mascota:");
                String nuevoNombre = kb.readLine();
                lista.modificar(codigoModificar, nuevoNombre);
                ManejoArchivo.escribirArchivoMascotas(lista);
                break;
            case 0:
                Helpers.print("Volviendo al menú principal...");
                break;
            default:
                Helpers.print("Opción no válida. Intente de nuevo.");
        }
    }

    private static void novedades() throws IOException {
        int opcionNovedad = Integer.parseInt(kb.readLine());
        switch (opcionNovedad) {
            case 1:
                Helpers.print("Ingrese el código de la mascota para realizar la adopción:");
                String codigoAdopcion = kb.readLine();

                
                Helpers.print("Ingrese el nombre de la persona que realiza la adopcion:");
                String titular = kb.readLine();

                ManejoArchivo.realizarAdopcion(codigoAdopcion, titular);
                break;
            case 2:
                Helpers.print("Ingrese el código de la mascota para retirar la adopción:");
                String codigoRetiro = kb.readLine();
                Helpers.print("Ingrese el nombre de la persona que retira la adopcion:");
                String titularRetiro = kb.readLine();
                ManejoArchivo.retirarAdopcion(codigoRetiro, titularRetiro);
                break;
            case 3:
                Helpers.print("Contenido del archivo de novedades:");
                String contenidoNovedades = ManejoArchivo.leerArchivoNovedades();
                Helpers.print(contenidoNovedades);
                break;
            case 0:
                Helpers.print("Volviendo al menú principal...");
                break;
            default:
                Helpers.print("Opción no válida. Intente de nuevo.");
        }
    }
}