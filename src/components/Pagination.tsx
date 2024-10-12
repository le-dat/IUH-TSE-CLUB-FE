/* eslint-disable no-unused-vars */
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import Button from './ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  className?: string
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, className, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const renderPageButton = (page: number, isCurrent: boolean) => (
    <Button
      key={page}
      onClick={() => handlePageClick(page)}
      className={`mx-1 rounded-lg px-3 py-1 transition-colors duration-200 ${
        isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {page}
    </Button>
  )

  const renderEllipsis = (key: string) => (
    <span key={key} className='mx-1'>
      ...
    </span>
  )

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPageNumbersToShow = 5
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2)

    let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow)
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow)

    if (currentPage <= halfMaxPageNumbersToShow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow)
    }

    if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(renderPageButton(1, currentPage === 1))
      if (startPage > 2) {
        pageNumbers.push(renderEllipsis('start-ellipsis'))
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(renderPageButton(i, i === currentPage))
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(renderEllipsis('end-ellipsis'))
      }
      pageNumbers.push(renderPageButton(totalPages, currentPage === totalPages))
    }

    return pageNumbers
  }

  return (
    <div className={twMerge('flex items-center justify-center space-x-2 bg-white p-4 shadow-sm', className)}>
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='mx-1 rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <FaChevronLeft />
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='mx-1 rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <FaChevronRight />
      </Button>
    </div>
  )
}

export default Pagination
