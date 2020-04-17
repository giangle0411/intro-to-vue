Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
    <div class="product">
    
      <div class="product-image">
      <img :src="image" />      
      </div>
      
      <div class="product-info">
        
      
        <h1>{{ title }}</h1>
        <p>Shipping: {{ shipping }}</p>
        
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        
        <h2>Details</h2>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <h3>Colors:</h3>
        <div v-for="(variant, index) in variants" :key="variant.variantId">
          <div class="color-box" :style="{ backgroundColor: variant.variantColor }" 
          @mouseover="updateProduct(index)"></div>
        </div>
        <button :class="{ disabledButton: !inStock }" v-on:click="addToCart" :disabled="!inStock">Add to Cart</button>
      </div>

      <product-review @review-submitted="addReview"></product-review> 

    </div>
    `,
    data() {
      return {
        product: "Socks",
        brand: "Vue Mastery",
        selectedVariant: 0,
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
          {
            variantId: 2234,
            variantQuantity: 15,
            variantColor: "green",
            variantImage: "./assets/vmSocks-green-onWhite.jpg"     
          },
          {
            variantId: 2235,
            variantQuantity: 0,
            variantColor: "blue",
            variantImage: "./assets/vmSocks-blue-onWhite.jpg"
          }
        ],
        reviews: []
      }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
          },
      updateProduct(index) {
        this.selectedVariant = index
      },
      addReview(productReview) {
        this.reviews.push(productReview)
      }
    },
    computed: {
      title() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].variantImage
      },
      inStock() {
        if (this.quantity > 0) {
          return true
        } else {
          return false
        }
      },
      shipping() {
        if (this.premium) {
          return "Free"
        } else {
          return 2.99
        }
      }
    }
  })
  
Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review" ></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    method: {
        onSubmit() {
          if (this.name && this.review && this.rating) {
            let productReview = {
              name: this.name,
              review: this.review,
              rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
          }
          else {
            if (!this.name) this.errors.push("Name required.")
            if (!this.review) this.errors.push("Review required.")
            if (!this.rating) this.errors.push("Rating required.")
          }
        }
    }
})

  var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
        updateCart(id) {
          this.cart.push(id)
      }
    }
  })

  Vue.config.devtools = true;

