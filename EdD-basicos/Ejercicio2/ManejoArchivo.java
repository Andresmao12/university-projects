package Ejercicio2;

import java.io.*;

public class ManejoArchivo {

    private static final String nombreArchivoMascotas = "huerfanito.txt";
    private static final String nombreArchivoNovedades = "novedades.txt";
    private static File archivoMascotas;
    private static File archivoNovedades;

    public static void crearArchivoMascotas() {
        archivoMascotas = new File(nombreArchivoMascotas);

        if (!archivoMascotas.exists()) {
            try {
                archivoMascotas.createNewFile();
                System.out.println("Archivo de mascotas creado con éxito.");
            } catch (IOException e) {
                System.out.println("Error al crear el archivo.");
            }
        }
    }

    public static void crearArchivoNovedades() {
        archivoNovedades = new File(nombreArchivoNovedades);

        if (!archivoNovedades.exists()) {
            try {
                archivoNovedades.createNewFile();
                System.out.println("Archivo de novedades creado con éxito.");
            } catch (IOException e) {
                System.out.println("Error al crear el archivo.");
            }
        }
    }

    public static ListaMascotas leerArchivoMascotas() {
        ListaMascotas lista = new ListaMascotas();
        try {
            FileReader fr = new FileReader(nombreArchivoMascotas);
            BufferedReader br = new BufferedReader(fr);
            String linea = br.readLine();

            while (linea != null) {
                String[] datos = linea.split(",");
                if (datos.length == 2) {
                    NodoMascota mascota = new NodoMascota(datos[0], datos[1]);
                    lista.insertar(mascota);
                }
                linea = br.readLine();
            }
            br.close();
        } catch (IOException err) {
            System.out.println("Error al leer el archivo de mascotas.");
        }
        return lista;
    }

    public static void escribirArchivoMascotas(ListaMascotas lista) {
        try {
            FileWriter fw = new FileWriter(archivoMascotas);
            BufferedWriter bw = new BufferedWriter(fw);
            NodoMascota actual = lista.getPrimero();
            while (actual != null) {
                bw.write(actual.getCodigo() + "," + actual.getNombre() + "\n");
                actual = actual.siguiente;
            }
            bw.close();
        } catch (IOException e) {
            System.out.println("Error al escribir en el archivo de mascotas.");
        }
    }

    public static void ingresarDatosMascota(String codigo, String nombre) {
        ListaMascotas lista = leerArchivoMascotas();
        NodoMascota nuevaMascota = new NodoMascota(codigo, nombre);
        lista.insertar(nuevaMascota);
        escribirArchivoMascotas(lista);
        System.out.println("Mascota agregada con éxito.");
    }

    public static void realizarAdopcion(String codigoMascota, String titular) {
        ListaMascotas lista = leerArchivoMascotas();
        NodoMascota mascota = lista.buscarPorCodigo(codigoMascota);
        if (mascota != null) {
            lista.eliminar(codigoMascota);
            escribirArchivoMascotas(lista);
            escribirNovedad("Adopción realizada - Mascota: " + mascota.getCodigo() + ", " + mascota.getNombre()+ ", " + titular);
            System.out.println("Adopción realizada con éxito.");
        } else {
            System.out.println("Mascota no encontrada.");
        }
    }

    public static void retirarAdopcion(String codigoMascota, String titularRetiro) {
        ListaMascotas lista = leerArchivoMascotas();

        //Dos validaciones agregadas
        String lecturaNov = leerArchivoNovedades();
        String[] registros = lecturaNov.split("\n");
        int numReg = 0;

        for (int i = 0; i < registros.length; i++) {
            if (registros[i].contains(codigoMascota)) {
                numReg = numReg + 1;
            }
        }

        NodoMascota controlador = lista.buscarPorCodigo(codigoMascota);

        if (controlador != null || (numReg % 2) == 0) { // En caso de ya estar en huerfanito.txt o de que el ultimo
                                                        // registro sea de que se retiro su adopcion(Esta en el sistema)
            System.out.println("La mascota no se ha adoptado, verifique");
            return;
        } else if (numReg == 0) { // En caso de que la mascota nunca se haya adoptado o ingresado
            System.out.println("No existe registro de la mascota");
            return;
        }

        String nombreMascota = obtenerNombreMascotaDeNovedad(codigoMascota);
        lista.insertar(new NodoMascota(codigoMascota, nombreMascota));
        escribirArchivoMascotas(lista);
        escribirNovedad("Adopción retirada - Mascota: " + codigoMascota + " Entregado por: " + titularRetiro);
        System.out.println("Adopción retirada con éxito.");
    }

    private static void escribirNovedad(String novedad) {
        try {
            FileWriter fw = new FileWriter(archivoNovedades, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(novedad + "\n");
            bw.close();
        } catch (IOException e) {
            System.out.println("Error al escribir en el archivo de novedades.");
        }
    }

    public static String leerArchivoNovedades() {
        String contenido = "";
        try {
            FileReader fr = new FileReader(archivoNovedades);
            BufferedReader br = new BufferedReader(fr);
            String linea = br.readLine();
            while (linea != null) {
                contenido += linea + "\n";
                linea = br.readLine();
            }
            br.close();
        } catch (IOException e) {
            System.out.println("Error al leer el archivo: " + archivoNovedades);
        }
        return contenido;
    }

    private static String obtenerNombreMascotaDeNovedad(String codigoMascota) {
        String contenidoNovedades = ManejoArchivo.leerArchivoNovedades();
        BufferedReader br = new BufferedReader(new StringReader(contenidoNovedades));
        String linea;
        try {
            while ((linea = br.readLine()) != null) {
                if (linea.contains("Adopción realizada - Mascota: " + codigoMascota)) {
                    String[] partes = linea.split(",");
                    return partes[1].trim();
                }
            }
        } catch (IOException e) {
            System.out.println("Error al leer el archivo de novedades.");
        } finally {
            try {
                br.close();
            } catch (IOException e) {
                System.out.println("Error al cerrar el BufferedReader.");
            }
        }
        return "sin nombre";
    }

}
