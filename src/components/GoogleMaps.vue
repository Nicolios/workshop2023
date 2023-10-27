<template>
        <div class="container">
    <div class="text-center">
      <h1>Trouver mon food-truck eco-responsable</h1>
    </div>
    <div class="research">
      <div class="d-flex gap-2 map">
        <p class="span">Mon périmètre de recherche : {{ rayon }} kms<output id="value"></output></p>
        <input id="pi_input" type="range" class="form-range" min="0" max="40" step="1" v-model="rayon" />
        <button @click="getData" class="btn btn-success">Rechercher</button>
      </div>
    </div>
    <div class="map">
      <GoogleMap
        api-key="AIzaSyDJb-W75KYY_qtHYpJiD9cEfEsLQikupZQ"
        style="height: 500px; width: 775px;"
        :center="{ lat: this.latitude, lng: this.longitude }"
        :zoom="calculateZoom()"
        id="maps"
      >
            
            
            <Marker
                v-for="(truck, index) in trucks"
                :key="index"
                :options="{
                    position: { lat: Number(truck.lat), lng: Number(truck.lon) },
                    icon: getColoredMarker(getColorByGrade(truck.note)),
                    title: truck.note
                }"
                @click="showInfo(truck)"

            >
            <InfoWindow v-if="showInfoWindow" :position="selectedTruckPosition">
                <div>
                    <h3>{{ selectedTruck.name }} - {{ selectedTruck.note }}</h3>
                    <a :href="selectedTruck.url">Site Web</a>
                <!-- Autres détails du camion -->
                </div>
            </InfoWindow>
            </Marker>
            
            <Marker
            :options="{
                position: { lat: this.latitude , lng: this.longitude }
            }"/>

            <Circle :options="{
                center: { lat: this.latitude, lng: this.longitude },
                radius: this.rayon * 1000,
                strokeOpacity: 0.3,
                strokeWeight: 2,
                }" 
            />
        </GoogleMap>
        </div>
    </div>
    
</template>

<style>
   body::before {
    content: "";
    background-image: url('../assets/LogoFoodFinder.png');
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: -1;
  }

  h1 {
    margin-top: 5% !important;
    text-align: center;
    background: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .map {
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center; /* Centrer horizontalement */
    align-items: center; /* Centrer verticalement */
  }

  .span {
    font-style: italic;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.7);
    padding: 5px;
    border-radius: 5px;
  }

  .form-range {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
  }
</style>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker, InfoWindow, Circle  } from "vue3-google-map";
import axios from "axios";

export default defineComponent({
    components: { GoogleMap, Marker, InfoWindow, Circle },
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
            rayon: 10,
            latitude: null,
            longitude: null,
            error: null,
            showInfoWindow: false, // Pour afficher ou masquer l'info-bulle
            selectedTruck: null,
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
        calculateZoom() {
            return Math.floor(13 - Math.log2(this.rayon / 100) / 4) / 1.1;
        },
        showInfo(truck) {
            console.log(truck)
            this.selectedTruck = truck;
            this.showInfoWindow = true;
        },
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
        },
        zoom() {
            this.calculateZoom()
        },
        selectedTruckPosition() {
            if (this.selectedTruck) {
            return { lat: Number(this.selectedTruck.lat), lng: Number(this.selectedTruck.lon) };
            }
            return { lat: 0, lng: 0 }; // Une position par défaut si aucun camion n'est sélectionné
        },
    }

});
</script>
