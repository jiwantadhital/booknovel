import React from 'react'

function Details(props) {
  return (
    <div>
          <div class="card-body">
        <h1 class="h2">{props.product.title}</h1>
        <p class="h3 py-2">$25.00</p>
        <p class="py-2">
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-secondary"></i>
            <span class="list-inline-item text-dark">Rating 4.8 | {props.product.comments.length} Comments</span>
        </p>


        <h6>Description:</h6>
        <p>{props.product.description}</p>

        <form action="" method="GET">
            <input type="hidden" name="product-title" value="Activewear"/>
            <div class="row">
                <div class="col-auto">
                    <ul class="list-inline pb-3">
                        <li class="list-inline-item">Category :
                            <input type="hidden" name="product-size" id="product-size" value="S"/>
                        </li>
                        {props.product.attributes.map((attribute) => (
                        <li class="list-inline-item"><span class="btn btn-success btn-size">{attribute.name}</span></li>
                        ))}
                    </ul>
                </div>
          
            </div>
            <div class="row pb-3">
                <div class="col d-grid">
                    <button type="submit" class="btn btn-success btn-lg" name="submit" value="buy">Add as Favourite</button>
                </div>
                <div class="col d-grid">
                    <button type="submit" class="btn btn-success btn-lg" name="submit" value="addtocard">Read</button>
                </div>
            </div>
        </form>

    </div>
    </div>
  )
}

export default Details