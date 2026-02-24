<template>
    <div class="inicio">
        <h1>Bienvenido a BillMe</h1>
        <p>Esta aplicación te permite gestionar tus movimientos financieros.</p>

        <div class="contenedor-cajas">
            <div class="caja-balance">
                <h2>Balance</h2>
                <div class="balance-grande" :class="{ 'negativo': balance < 0 }">
                    {{ balance.toFixed(2) }} €
                </div>
                <div class="resumen">
                    <div class="item-resumen ingresos">
                        <span class="etiqueta">Ingresos totales</span>
                        <span class="valor">{{ totalIngresos.toFixed(2) }} €</span>
                    </div>
                    <div class="item-resumen gastos">
                        <span class="etiqueta">Gastos totales</span>
                        <span class="valor">{{ totalGastos.toFixed(2) }} €</span>
                    </div>
                </div>
            </div>


            <div class="caja-movimientos" v-on:click="iraMovimientos">
                <h2>Últimos Movimientos</h2>
                <div v-if="ultimosMovimientos.length === 0" class="sin-movimientos">
                    No hay movimientos registrados
                </div>
                <div v-else class="lista-movimientos">
                    <div v-for="(movimiento, index) in ultimosMovimientos" :key="index" class="movimiento-item"
                        :class="movimiento.tipo">
                        <div class="movimiento-info">
                            <span class="concepto">{{ movimiento.concepto }}</span>
                            <span class="fecha">{{ formatearFecha(movimiento.fecha) }}</span>
                        </div>
                        <span class="cantidad">
                            <span v-if="movimiento.tipo === 'gasto'">-</span>{{ movimiento.cantidad }} €
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            balance: 0,
            totalIngresos: 0,
            totalGastos: 0,
            movimientos: [],
            ultimosMovimientos: []
        }
    },
    mounted() {
        this.cargarDatos();
    },
    methods: {
        cargarDatos() {
            const guardados = localStorage.getItem('movimientos');
            if (guardados) {
                this.movimientos = JSON.parse(guardados);
                this.calcularTotales();
                this.obtenerUltimosMovimientos();
            }
        },
        calcularTotales() {
            this.totalIngresos = 0;
            this.totalGastos = 0;
            this.movimientos.forEach(movimiento => {
                if (movimiento.tipo === 'ingreso') {
                    this.totalIngresos += movimiento.cantidad;
                } else {
                    this.totalGastos += movimiento.cantidad;
                }
            });
            this.balance = this.totalIngresos - this.totalGastos;
        },
        obtenerUltimosMovimientos() {
            this.ultimosMovimientos = [...this.movimientos]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .slice(0, 4);
        },
        formatearFecha(fecha) {
            return new Date(fecha).toLocaleDateString();
        },
        iraMovimientos() {
            this.$router.push('/listado');
        }
    }
}
</script>

<style scoped>
.inicio {
    text-align: center;
    padding: 40px 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin: 20px;
}

h1 {
    margin-bottom: 10px;
    color: #333;
}

p {
    margin-bottom: 40px;
    color: #666;
    font-size: 18px;
}

.contenedor-cajas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.caja-balance {
    background: white;
    border: 3px solid lightgreen;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.caja-balance h2 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 24px;
    text-align: center;
}

.balance-grande {
    font-size: 56px;
    font-weight: bold;
    color: lightgreen;
    text-align: center;
    padding: 20px;
    margin-bottom: 25px;
    border-radius: 8px;
    background: #f9f9f9;
}

.balance-grande.negativo {
    color: red;
}

.resumen {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.item-resumen {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background: #f9f9f9;
}

.item-resumen.ingresos {
    border-left: 5px solid green;
}

.item-resumen.gastos {
    border-left: 5px solid red;
}

.etiqueta {
    font-size: 16px;
    color: #666;
}

.valor {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.item-resumen.ingresos .valor {
    color: green;
}

.item-resumen.gastos .valor {
    color: red;
}

.caja-movimientos {
    background: white;
    border: 3px solid lightgreen;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
}

.caja-movimientos:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
}

.caja-movimientos h2 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 24px;
    text-align: center;
}

.sin-movimientos {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-size: 16px;
}

.lista-movimientos {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.movimiento-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background: #f9f9f9;
}

.movimiento-item.ingreso {
    border-left: 5px solid green;
}

.movimiento-item.gasto {
    border-left: 5px solid red;
}

.movimiento-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.concepto {
    font-weight: bold;
    font-size: 16px;
    color: #333;
}

.fecha {
    font-size: 13px;
    color: #999;
}

.cantidad {
    font-size: 18px;
    font-weight: bold;
}

.movimiento-item.ingreso .cantidad {
    color: green;
}

.movimiento-item.gasto .cantidad {
    color: red;
}
</style>