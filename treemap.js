const TREE_o
=
{
  rectangle_o:
  {
    data_a:
      []
  , xStart_n:
      0
  , yStart_n:
      0
  , totalWidth_n:
      0    //: width_n
  , totalHeight_n:
      0    //: height_n
  }
, initialData_a:
    null




, getMaximum__n:
  number_a =>
    Math
      .max
      (
        ...number_a
      )



, getMinimum__n:
  number_a =>
    Math
      .min
      (
        ...number_a
      )



, sumReducer__n:
  (
    sum_n
  , at_n
  ) =>
    sum_n
    +
    at_n



, roundValue__n:
    number_n =>
      Math
        .max
        (
          Math
            .round
            (
              number_n
              *
              100
            )
            /
            100
        , 0
        )



, worstRatio__n
  (
    row_a
  , width_n
  )
  {
    const sum_n
    =
      row_a
        .reduce
        (
          sumReducer__n
        , 0
        )

    const rowMax_n
    =
      getMaximum__n( row_a )

    const rowMin_n
    = getMinimum__n( row_a )

    return (
      Math
        .max
        (
          (
            (
              width_n
              **
              2
            )
            *
            rowMax_n
          )
          /
          (
            sum_n
            **
            2
          )
        , (
            sum_n
            **
            2
          )
          /
          (
            (
              width_n
              **
              2
            )
            *
            rowMin_n
          )
        )
    )
  }



, getMin__o
  ()
  {
    if
    (
      TREE_o
        .rectangle_o
          .totalHeight_n
          **
          2
      >
      TREE_o
        .rectangle_o
          .totalWidth_n
          **
          2
    )
    {
      return (
        {
          dim_n:
            TREE_o
              .rectangle_o
                .totalWidth_n
        , vertical_b:
            false
        }
      )
    }
    
    return (
      {
        dim_n:
          TREE_o
            .rectangle_o
              .totalHeight_n
      , vertical_b:
          true
      }
    )
  }



, layoutRow__v
  (
    row_a
  , width_n
  , vertical_b
  )
  {
    const rowHeight_n
    =
      row_a
        .reduce
        (
          sumReducer__n
        , 0
        )
      /
      width_n

    row_a
      .forEach
      (
        at_n =>
        {
          const rowWidth_n
          =
            at_n
            /
            rowHeight_n

          const { xStart_n }
          =
            TREE_o
              .rectangle_o

          const { yStart_n }
          =
            TREE_o
              .rectangle_o
    
          let data_a

          if
          (
            vertical_b
          )
          {
            data_a
            =
              {
                x_n:
                  xStart_n
              , y_n:
                  yStart_n
              , width_n:
                  rowHeight_n
              , height_n:
                  rowWidth_n
              , data_a:
                  TREE_o
                    .initialData_a
                    [
                      TREE_o
                        .rectangle_o
                          .data_a
                            .length
                    ]
              }

            TREE_o
              .rectangle_o
                .yStart_n
            +=
              rowWidth_n
          }
          else
          {
            data_a
            =
              {
                x_n:
                  xStart_n
              , y_n:
                  yStart_n
              , width_n:
                  rowWidth_n
              , height_n:
                  rowHeight_n
              , data_a:
                  TREE_o
                    .initialData_a
                    [
                      TREE_o
                        .rectangle_o
                          .data_a
                            .length
                    ]
              }

            TREE_o
              .rectangle_o
                .xStart_n
            +=
              rowWidth_n
          }
    
          TREE_o
            .rectangle_o
              .data_a
                .push( data_a )
        }
      )

    if
    (
      vertical_b
    )
    {
      TREE_o
        .rectangle_o
          .xStart_n
      +=
        rowHeight_n

      TREE_o
        .rectangle_o
          .yStart_n
      -=
        width_n

      TREE_o
        .rectangle_o
          .totalWidth_n
      -=
        rowHeight_n
    }
    else
    {
      TREE_o
        .rectangle_o
          .xStart_n
      -=
        width_n

      TREE_o
        .rectangle_o
          .yStart_n
      +=
        rowHeight_n

      TREE_o
        .rectangle_o
          .totalHeight_n
      -=
        rowHeight_n
    }
  }



, layoutLastRow__v
  (
    row_a
  , children_a
  , width_n
  )
  {
    const { vertical_b }
    =
      getMin__o()

    layoutRow__v
    (
      row_a
    , width_n
    , vertical_b
    )

    layoutRow__v
    (
      children_a
      , width_n
      , vertical_b
    )
  }



, squarify__v
  (
    children_a
  , row_a
  , width_n
  )
  {
    if
    (
      children_a
        .length
      ===
      1
    )
    {
      return void (
        layoutLastRow__v
        (
          row_a
        , children_a
        , width_n
        )
      )
    }

    const rowWithChild_a
    =
      [
        ...row_a
      , children_a[0]
      ]

    if
    (
      row_a
        .length
      ===
      0
      ||
      worstRatio__n
      (
        row_a
      , width_n
      )
      >=
      worstRatio__n
      (
        rowWithChild_a
      , width_n
      )
    )
    {
      children_a
        .shift()

      return void (
        squarify__v
        (
          children_a
        , rowWithChild_a
        , width_n
        )
      )
    }

    layoutRow__v
    (
      row_a
    , width_n
    , getMin__o()
        .vertical_b
    )

    return (
      squarify__v
      (
        children_a
      , []
      , getMin__o()
          .dim_n
      )
    )
  }



, init__a
  (
    data_a
  , width_n
  , height_n
  )
  {
    TREE_o
      .rectangle_o
    =
    {
      data_a:
        []
    , xStart_n:
        0
    , yStart_n:
        0
    , totalWidth_n:
        width_n
    , totalHeight_n:
        height_n
    }

    TREE_o
      .initialData_a
    =
      data_a

    const totalValue_n
    =
      data_a
        .map
        (
          dataPoint =>
            dataPoint
              .dim_n
        )
          .reduce
            (
              sumReducer__n
            , 0
            )

    const dataScaled_a
    =
      data_a
        .map
        (
          dataPoint =>
            (
              dataPoint
                .dim_n
              *
              height_n
              *
              width_n
            )
            /
            totalValue_n
        )
  
    squarify__v
    (
      dataScaled_a
    , []
    , getMin__o()
        .dim_n
    )

    return (
      TREE_o
        .rectangle_o
          .data_a
            .map
            (
              dataPoint =>
              (
                {
                  ...dataPoint
                  , x_n:
                      roundValue__n
                      (
                        dataPoint
                          .x_n
                      )
                  , y_n:
                      roundValue__n
                      (
                        dataPoint
                          .y_n
                      )
                  , width_n:
                      roundValue__n
                      (
                        dataPoint
                          .width_n
                      )
                  , height_n:
                      roundValue__n
                      (
                        dataPoint
                          .height_n
                      )
                }
              )
            )
    )
  }
}