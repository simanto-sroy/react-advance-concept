import React from 'react';

import NewsList from '../components/news-list';
import News, { newsCategory } from '../news';
import Header from '../components/header';
import Pagination from '../components/pagination';
import Loading from '../components/loading';

const news = new News(newsCategory.technology)

class App extends React.Component {

    state = {
        data: {},
        isLoading: true,
    }

    changeCategory = (category) => {
        this.setState({ isLoading: true })
        news.changeCategory(category)
            .then(data => {
                this.setState({data, isLoading: false})
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }

    componentDidMount() {
        news.getNews()
            .then(data => {
                this.setState({data, isLoading: false})
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }

    next = () => {
        if(this.state.data.isNext){
            this.setState({isLoading: true})
        }
        news.next()
            .then(data => {
                this.setState({data, isLoading: false})
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }

    prev = () => {
        if(this.state.data.isPrevious){
            this.setState({isLoading: true})
        }
        news.prev()
            .then(data => {
                this.setState({data, isLoading: false})
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }

    handlePageChange = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                currentPage: Number.parseInt(value)
            }
        })
    }

    goTopage = () => {
        this.setState({ isLoading: true})
        news.setCurrentPage(this.state.data.currentPage)
            .then(data => {
                this.setState({data, isLoading:false});
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }

    search = (searchTrm) => {
        this.setState({ isLoading: true})
        news.search(searchTrm)
            .then(data => {
                this.setState({data, isLoading:false});
            })
            .catch(err => {
                console.log(err)
                alert('Something Went Wrong?')
                this.setState({ isLoading: false })
            })
    }


    render() {
        const {
            article,
            isPrevious,
            isNext,
            category,
            totalResults,
            currentPage,
            totalPages,
        } = this.state.data
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-md-3">
                        <Header
                            category={category}
                            changeCategory={this.changeCategory}
                            search={this.search}
                        />
                        <div className="d-flex">
                            <p className="text-black-50">About {totalResults} result found</p>
                            <p className="text-black-50 ms-auto">{currentPage} pages of {totalPages}</p>
                        </div>
                        {this.state.isLoading ? (
                            <Loading/>
                        ):(
                            <div>
                                <NewsList news={article} />
                                <Pagination
                                    next={this.next}
                                    prev={this.prev}
                                    isPrevious={isPrevious}
                                    isNext={isNext}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageChange={this.handlePageChange}
                                    goTopage={this.goTopage}
                                />
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        );  
    }
}

export default App;