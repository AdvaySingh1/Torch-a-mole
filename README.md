Natural Selection moddeleed in an AI power Wack-A-Mole game. Difficulty is set by the user and modles learn to adapt to the user playstyle. Game can be played with any of two bach end systems:
 - Torch API powered cnn.
 - C++ objected oriented tensor class model.

Rational for C++: most of the computation time in large scale projects occurs in C++. As a compiled language, it is time efficient. In fact, even PyTorch and Tensorflow are first converted to C++ then computed. Thus, it's essential to understand the inner workings of the APIs.