package Ejercicio1;

public class Trabajador {

    private String nombre;
    private String cedula;
    private double salario;
    private String genero;

    public Trabajador( String nombre, String cedula, double salario, String genero){

        this.nombre = nombre;
        this.cedula = cedula;
        this.salario = salario;
        this.genero = genero;

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

}