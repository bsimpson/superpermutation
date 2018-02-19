class Superpermutation
  def self.calc(val)
    a=(1..val.to_i).to_a
    products = a.permutation.to_a.map {|x| x.join('')} # ["12", "21"]
    permutation_of_products = products.permutation.to_a # [["12","21"], ["21", "12"]]
    shortest_string = nil

    permutation_of_products.each do |products| # ["12", "21"]
      test_string = products.reduce('') do |sum, product| # "12"
        if sum[/#{product}/]
          # string already contains combination - do nothing
          sum
        else
          # concat new pattern
          sum.concat(product)

          # Remove adjacent dups
          sum_array = sum.split('') # ["1","2","2","1"]
          unique_array = []
          previous_val = nil
          sum_array.each do |x|
            if (previous_val != x)
              unique_array.push(x)
            end
            previous_val = x
          end
          sum = unique_array.join('') # "121"
        end
        sum
      end

      if shortest_string.nil? || (shortest_string.length > test_string.length)
        shortest_string = test_string
      end
    end

    shortest_string
  end

  def self.pretty(val)
    puts "Shortest string is '#{calc(val)}'"
  end
end
