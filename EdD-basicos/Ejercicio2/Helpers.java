package Ejercicio2;


public class Helpers {

    public static void print(String text) {
        System.out.println(text);
    }

    public static String menuPrincipal() {
        return "-- EL HUERFANITO -- \n" +
                "1. Consultar. \n" +
                "2. Actualizar datos. \n" +
                "3. Novedades. \n" +
                "0. Salir";
    }

    public static String menuConsultas() {
        return "-- CONSULTAR POR -- \n" +
                "1. Codigo \n" +
                "2. Nombre de mascota \n" +
                "0. Volver al menu principal.";
    }

    public static String menuActualizacion(){
        return "-- Elija una opción -- \n" +
                "1. Ingresar. \n" +
                "2. Eliminar. \n" +
                "3. Modificar. \n" +
                "0. Volver al menu principal.";
    }

    public static String menuNovedades() {
        return "-- Elija una novedad -- \n" +
                "1. Realizar adopción. \n" +
                "2. Retirar adopción \n" +
                "3. Ver novedades \n" +
                "0. Volver al menu principal. ";
    }
}
