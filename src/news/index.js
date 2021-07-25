import axios from '../utils/axios';

export const newsCategory = {
    technology: 'technology',
    science: 'science',
    business: 'business',
    entertainment: 'entertainment',
    health: 'health',
    sports: 'sports',
    general: 'general'
}

const MAX_ITEM_PER_PAGE = 5;

export default class News {
    constructor(category) {
        this._category = category;
        this._searchTerm = '';
        this._pageSize = MAX_ITEM_PER_PAGE;
        this._currentPage = 1; 
        this._totalPages = 1;
    }

    async getNews(){
        try {
            const {data} = await axios.get(this._getURL())
            this._totalPages = Math.ceil(data.totalResults / this._pageSize);
            return {
                article: data.articles,
                totalPages: this._totalPages,
                currentPage: this._currentPage,
                isNext: this._isNext(),
                isPrevious: this._isPrevious(),
                category: this._category,
                totalResults: data.totalResults
            }   
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

    next() {
        if(this._isNext()) {
            this._currentPage++
            return this.getNews()
        }return false
    }

    prev() {
        if(this._isNext()) {
            this._currentPage--
            return this.getNews()
        }return false
    }

    setCurrentPage(pageNumber) {
        if(pageNumber < 1 && pageNumber > this._totalPages) {
            throw new Error("Invalid page number")
        }
        this._currentPage = pageNumber
        return this.getNews()
    }

    changeCategory(category) {
        this._category = category;
        this.currentPage = 1;
        return this.getNews()
    }

    search(term){
        this._searchTerm = term;
        return this.getNews()
    }

    _getURL() {
        let url = '/?'
        if(this._category) url += `category=${this._category}`;
        if(this._searchTerm) url += `&q=${this._searchTerm}`;
        if(this._pageSize) url += `&pageSize=${this._pageSize}`;
        if(this._currentPage) url += `&page=${this._currentPage}`;

        return url;
    }

    _isNext() {
        return this._currentPage < this._totalPages;
    }

    _isPrevious() {
        return this._currentPage > 1
    }
}