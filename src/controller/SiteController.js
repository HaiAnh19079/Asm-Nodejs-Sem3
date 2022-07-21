class SiteController {
    //[GET] /
    index(req, res, next) {
        res.render('client/home')
    }

    
}

export default new SiteController()
/**
 {{!-- {{#if product.images}}
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="{{@index}}"
                                                accept=".png, .jpg, .jpeg" name="imageupdate"
                                                value="">
                                            <label class="position-relative " for="{{@index}}"
                                                id="preview-{{@index}}">

                                                <img class="set-bg" src="{{product.images.[0].url}}" alt="">
                                                <div >{{product.images.[0].url}}
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        {{#if product.images.[1]}}
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="{{@index}}"
                                                accept=".png, .jpg, .jpeg" name="imageupdate"
                                                value="">
                                            <label class="position-relative " for="{{@index}}"
                                                id="preview-{{@index}}">

                                                <img class="set-bg" src="{{product.images.[1].url}}" alt="">
                                                <div >{{product.images.[1].url}}
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        {{else}}
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="file-2"
                                                accept=".png, .jpg, .jpeg" name="imageupdate" >
                                            <label class="position-relative " for="file-2" id="preview-file-2">
                                                <img class="set-bg" src="https://bit.ly/3ubuq5o" alt="">
                                                <div >
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        {{/if}}

                                        {{!-- img 3 --}}
                                        {{#if product.images.[2]}}
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="{{@index}}"
                                                accept=".png, .jpg, .jpeg" name="imageupdate"
                                                value="">
                                            <label class="position-relative " for="{{@index}}"
                                                id="preview-{{@index}}">

                                                <img class="set-bg" src="{{product.images.[2].url}}" alt="">
                                                <div >{{product.images.[2].url}}
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        {{else}}
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="file-3"
                                                accept=".png, .jpg, .jpeg" name="imageupdate" >
                                            <label class="position-relative " for="file-3" id="preview-file-3">
                                                <img class="set-bg" src="https://bit.ly/3ubuq5o" alt="">
                                                <div >
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        {{/if}}
                                    {{else}}
                                    <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="file-1"
                                                accept=".png, .jpg, .jpeg" name="imageupdate" >
                                            <label class="position-relative " for="file-1" id="preview-file-1">
                                                <img class="set-bg" src="https://bit.ly/3ubuq5o" alt="">
                                                <div >
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="file-2"
                                                accept=".png, .jpg, .jpeg" name="imageupdate" >
                                            <label class="position-relative " for="file-2" id="preview-file-2">
                                                <img class="set-bg" src="https://bit.ly/3ubuq5o" alt="">
                                                <div >
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="form-group img-content ">
                                            <input type="file" class="d-none " id="file-3"
                                                accept=".png, .jpg, .jpeg" name="imageupdate" >
                                            <label class="position-relative " for="file-3" id="preview-file-3">
                                                <img class="set-bg" src="https://bit.ly/3ubuq5o" alt="">
                                                <div >
                                                    <span>+</span>
                                                </div>
                                            </label>
                                        </div>
                                    {{/if}} --}}
 */