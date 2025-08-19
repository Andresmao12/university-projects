package Ejercicio1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class General {

    public static BufferedReader cp = new BufferedReader(new InputStreamReader(System.in));

    // En caso de que no se le pase boolean imprime por defecto con salto de linea
    public static void imprimir(String cadena) {
        System.out.println(cadena);
    }

    // Imprime con o sin salto de linea, depende del boolean
    public static void imprimir(String cadena, boolean salto) {

        if (salto) {
            System.out.println(cadena);
        } else if (!salto) {
            System.out.print(cadena);
        }
    }

    // En caso de recibir un string
    public static String leer(String mensaje, boolean salto) throws IOException {
        imprimir(mensaje, salto);
        return cp.readLine();
    }

    // En caso de recibir un entero, no retorna hasta que no se le pase un entero
    public static int leer(String mensaje) throws IOException {
        int valor;

        do {
            try {

                imprimir(mensaje, false);
                valor = Integer.parseInt(cp.readLine());
                return valor;

            } catch (Exception e) {
                imprimir("Ingrese un valor numerico valido");
            }
        } while (true);
    }
}