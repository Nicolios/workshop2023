<template>
    <h2>Trouver mon food-truck eco-responsable</h2>
    <div>
        <div class="d-flex gap-2 map">
            <p>Rayon: {{ rayon }}<output id="value"></output></p>
            <input id="pi_input" type="range" class="form-range" min="0" max="1000" step="1" v-model="rayon"/>
            <button @click="getData" class="btn btn-success">Rechercher</button>
        </div>
        
    </div>
    <div class="map">
        <GoogleMap api-key="AIzaSyDJb-W75KYY_qtHYpJiD9cEfEsLQikupZQ" style="height: 500px; width: 775px;" :center="{ lat: this.latitude, lng: this.longitude }" :zoom="10" id="maps">
            <Marker
                v-for="(truck, index) in trucks"
                :key="index"
                :options="{
                    position: { lat: Number(truck.lat), lng: Number(truck.lon) },
                    icon: getColoredMarker(getColorByGrade(truck.note))
                }"
            />
            <Marker
            :options="{
                position: { lat: this.latitude , lng: this.longitude }
            }"/>
        </GoogleMap>
    </div>
    
</template>

<style>
    h2{
        margin: 5% !important;
        text-align: center;
    }
    .map {
        display: flex;
        margin: 0% 5% 5% 5%;
        justify-content: center;
    }
</style>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";

export default defineComponent({
    components: { GoogleMap, Marker},
    data(){
        return {
            trucks: [],
            gradeColors: {
                'A': '#00FF00',
                'B': '#ADFF2F',
                'C': '#FFFF00',
                'D': '#FFA500',
                'E': '#FF0000'
            },
            rayon: 50,
            latitude: null,
            longitude: null,
            error: null,
        }
    },
    async mounted() {
        try {
            const coordinates = await this.getLocation();
            this.latitude = coordinates.latitude;
            this.longitude = coordinates.longitude;
            this.getData();
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        getData(){
            axios
                .get(import.meta.env.VITE_API_URL+'trucks', {
                    headers: { 
                        lat: this.latitude,
                        lon: this.longitude,
                        rayon: this.rayon,
                    }
                })
                .then((response) => {
                    this.trucks = response.data
                }).catch((error) => {
                    console.log(error)
                })
                
        },
        getColoredMarker(color) {
            return {
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#000000',
                scale: 1.5
            };
        },
        getColorByGrade(grade) {
            return this.gradeColors[grade] || '#000000'; // Default to black if grade is not found
        },
        
        getLocation() {
            return new Promise((resolve, reject) => {
                if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    resolve({ latitude: this.latitude, longitude: this.longitude });
                    },
                    (error) => {
                    this.error = `Erreur de géolocalisation : ${error.message}`;
                    reject(error);
                    }
                );
                } else {
                this.error = "La géolocalisation n'est pas prise en charge par ce navigateur.";
                reject("Géolocalisation non prise en charge.");
                }
            });
        },

    },
    computed: {
        rayon(){
            const input = document.querySelector("#pi_input");
            return input.value;
        }
    }

});
</script>

<style>
.input-rayon{
    display: flex;
    gap: 10px;
}
.form-range{
    max-width: 250px;
}
</style>